# # resume_ai/utils.py
# import base64
# import io
# import os
# from dotenv import load_dotenv
# from pdf2image import convert_from_bytes
# from google import generativeai as genai

# # Load API key
# load_dotenv()
# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


# def input_pdf_setup(uploaded_file):
#     """
#     Convert the first page of a PDF to a Gemini-compatible image part.
#     Returns a dict: {"mime_type": "image/png", "data": "<base64>"}.
#     """
#     uploaded_file.seek(0)  # ensure pointer is at start
#     images = convert_from_bytes(uploaded_file.read())
#     if not images:
#         raise ValueError("No pages found in the PDF.")

#     buffer = io.BytesIO()
#     images[0].save(buffer, format="PNG")
#     encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")

#     return {"mime_type": "image/png", "data": encoded}


# def get_gemini_response(pdf_part, prompt):
#     """
#     Send the image + prompt to Gemini and return the text response.
#     """
#     model = genai.GenerativeModel("gemini-1.5-flash")
#     response = model.generate_content([pdf_part, prompt])
#     return response.text










# backend/resume_ai/utils.py
from google.genai import Client
import os
from dotenv import load_dotenv
import fitz  # PyMuPDF
import json

# Load API key from .env
load_dotenv()
API_KEY = os.getenv("API_KEY")

# Initialize Gemini client
client = Client(api_key=API_KEY)


def extract_text_from_pdf(file) -> str:
    """
    Extract text from an uploaded PDF file using fitz (PyMuPDF).
    """
    pdf_document = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in pdf_document:
        text += page.get_text("text") + "\n"
    pdf_document.close()
    return text


# def analyze_resume_with_gemini(resume_text: str, job_description_text: str) -> str:
#     """
#     Sends a resume and job description to Gemini and returns the analysis.
#     """
#     prompt = f"""
# You are an ATS. Compare the resume with the job description.

# Resume:
# {resume_text}

# Job Description:
# {job_description_text}

# Return JSON with the following keys:
# - ats_score
# - summary
# - key_matches
# - missing_skills
# - recommendations
# """
   

#     try:
#         response = client.models.generate_content(
#             model="models/gemini-2.5-pro",
#             contents=prompt
#         )
#         return response.text

#     except Exception as e:
#         return f"Gemini API call failed: {str(e)}"


def analyze_resume_with_gemini(resume_text: str, job_description_text: str) -> dict:
    """
    Sends a resume and job description to Gemini and returns parsed analysis as dict.
    Ensures clean, valid JSON without markdown or symbols.
    """
    prompt = f"""
You are an ATS (Applicant Tracking System). Compare the given resume with the job description.

Resume:
{resume_text}

Job Description:
{job_description_text}

Return ONLY a valid JSON object with the following keys:
- ats_score
- summary
- key_matches
- missing_skills
- recommendations
Do NOT include markdown (**bold**, code blocks, or explanations).
"""

    try:
        response = client.models.generate_content(
            model="models/gemini-2.5-pro",
            contents=prompt
        )
        raw_text = response.text.strip()

        # 🧹 Clean unwanted markdown/code formatting
        if "```" in raw_text:
            raw_text = raw_text.split("```")[-2]  # extract content inside code block
        raw_text = raw_text.replace("**", "").replace("json", "").strip()

        # ✅ Try parsing as JSON
        try:
            return json.loads(raw_text)
        except json.JSONDecodeError:
            cleaned = raw_text.replace("'", '"')
            return json.loads(cleaned)

    except Exception as e:
        return {"error": f"Gemini API call failed: {str(e)}"}




