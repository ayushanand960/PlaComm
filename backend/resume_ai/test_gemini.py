# from google.genai import Client
# import os
# from dotenv import load_dotenv

# load_dotenv()
# API_KEY = os.getenv("API_KEY")

# client = Client(api_key=API_KEY)

# response = client.models.generate_content(
#     model="models/gemini-2.5-pro",
#     contents="Write a short professional summary  for a software engineer resume."
# )

# print(response.text)












from google.genai import Client
import os
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
API_KEY = os.getenv("API_KEY")

# Initialize Gemini client
client = Client(api_key=API_KEY)

# -------------------------
# Hardcoded Resume & Job Description
# -------------------------
resume_text = """
Resume:
Siddharth Mishra
Email: siddharth@example.com
Phone: +91-XXXXXXXXXX

Education:
B.Tech in Computer Science, XYZ University, 2023

Experience:
- Software Engineer Intern at ABC Corp (Jan 2023 - May 2023)
  Developed REST APIs in Python and Django, worked on database optimization.
- Academic Project: Built a web app using React and Flask to manage student assignments.

Skills:
Python, JavaScript, React, Django, SQL, Git, Docker
"""

job_description_text = """
Job Description:
We are looking for a Software Engineer to join our dynamic team. 
Responsibilities include developing and maintaining web applications, collaborating with cross-functional teams, and ensuring high-quality code. 
Must be proficient in Python, JavaScript, React, and cloud technologies. Experience with REST APIs, SQL databases, and CI/CD pipelines is a plus.
"""

# -------------------------
# Create a single prompt
# -------------------------
prompt = f"""
You are an ATS. Compare the resume with the job description and provide a professional analysis.

Resume:
{resume_text}

Job Description:
{job_description_text}

Provide:
1.ATS Score
2. Short professional summary
3. Key matches with the job description
4. Missing skills or gaps
5. Recommendations to improve the resume for this job
"""

# -------------------------
# Generate content
# -------------------------
try:
    response = client.models.generate_content(
        model="models/gemini-2.5-pro",
        contents=prompt  # single string prompt
    )

    # Print the output
    print(response.text)

except Exception as e:
    print("Gemini API call failed:", e)