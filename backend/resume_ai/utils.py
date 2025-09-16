# # resume_ai/utils.py
# import base64
# import io
# import os
# from dotenv import load_dotenv
# from pdf2image import convert_from_bytes
# from google import generativeai as genai

# load_dotenv()
# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


# def input_pdf_setup(uploaded_file):
#     """
#     Convert the first page of a PDF to a base64-encoded PNG string.
#     """
#     uploaded_file.seek(0)  # just in case
#     images = convert_from_bytes(uploaded_file.read())
#     if not images:
#         raise ValueError("No pages found in the PDF.")

#     buffer = io.BytesIO()
#     images[0].save(buffer, format="PNG")
#     return base64.b64encode(buffer.getvalue()).decode("utf-8")


# def get_gemini_response(base64_image, prompt):
#     """
#     Send the image + prompt to Gemini and return the text response.
#     """
#     model = genai.GenerativeModel("gemini-pro-vision")
#     response = model.generate_content(
#         [
#             {"mime_type": "image/png", "data": base64_image},
#             prompt,
#         ]
#     )
#     return response.text



# resume_ai/utils.py
import base64
import io
import os
from dotenv import load_dotenv
from pdf2image import convert_from_bytes
from google import generativeai as genai

# Load API key
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def input_pdf_setup(uploaded_file):
    """
    Convert the first page of a PDF to a Gemini-compatible image part.
    Returns a dict: {"mime_type": "image/png", "data": "<base64>"}.
    """
    uploaded_file.seek(0)  # ensure pointer is at start
    images = convert_from_bytes(uploaded_file.read())
    if not images:
        raise ValueError("No pages found in the PDF.")

    buffer = io.BytesIO()
    images[0].save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return {"mime_type": "image/png", "data": encoded}


def get_gemini_response(pdf_part, prompt):
    """
    Send the image + prompt to Gemini and return the text response.
    """
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content([pdf_part, prompt])
    return response.text
