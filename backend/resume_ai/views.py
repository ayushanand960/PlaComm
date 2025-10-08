# # resume_ai/views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .utils import input_pdf_setup, get_gemini_response


# class ResumeAnalyzeView(APIView):
#     def post(self, request):
#         jd = request.data.get("job_description")
#         resume_file = request.FILES.get("resume")

#         if not jd or not resume_file:
#             return Response(
#                 {"error": "Both JD and resume file are required"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         try:
#             # Convert resume into image
#             pdf_content = input_pdf_setup(resume_file)

#             # Build structured prompt for ATS scoring
#             prompt = f"""
#             You are an ATS (Applicant Tracking System). Compare this resume with the job description.
#             Provide:
#             1. An ATS compatibility score (0-100%).
#             2. A short explanation of why the score was given.
#             3. Key suggestions to improve the resume for this JD.

#             Job Description:
#             {jd}
#             """

#             # Call Gemini
#             result = get_gemini_response(pdf_content, prompt)

#         except Exception as e:
#             # Catch Gemini/connection/format errors
#             return Response(
#                 {
#                     "error": "Failed to analyze resume with Gemini AI",
#                     "details": str(e),
#                 },
#                 status=status.HTTP_502_BAD_GATEWAY,  # bad upstream AI service
#             )

#         # Default parsing
#         ats_score, explanation, suggestions = None, None, result
#         try:
#             # Expect format like: "ATS Score: 75%\nExplanation: ...\nSuggestions: ..."
#             lines = result.splitlines()
#             for line in lines:
#                 if "score" in line.lower():
#                     ats_score = line.split(":", 1)[-1].strip()
#                 elif "explanation" in line.lower():
#                     explanation = line.split(":", 1)[-1].strip()
#         except Exception:
#             pass

#         return Response(
#             {
#                 "ats_score": ats_score or "N/A",
#                 "explanation": explanation or "N/A",
#                 "suggestions": suggestions,
#             },
#             status=status.HTTP_200_OK,
#         )







# backend/resume_ai/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import extract_text_from_pdf, analyze_resume_with_gemini
import json


class ResumePDFAnalysisAPIView(APIView):
    """
    POST endpoint to analyze a PDF resume against a pasted job description.
    """

    def post(self, request):
        resume_file = request.FILES.get("resume")
        job_description_text = request.data.get("job_description")

        if not resume_file or not job_description_text:
            return Response(
                {"error": "Both 'resume' (PDF) and 'job_description' fields are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Extract resume text using fitz
        resume_text = extract_text_from_pdf(resume_file)

        # Analyze using Gemini
        # analysis_text = analyze_resume_with_gemini(resume_text, job_description_text)

        # # Try to parse Gemini output as JSON
        # try:
        #     analysis_json = json.loads(analysis_text)
        # except:
        #     # Fallback if it's not valid JSON
        #     analysis_json = {"suggestions": analysis_text}



        analysis_json = analyze_resume_with_gemini(resume_text, job_description_text)
        return Response(analysis_json, status=status.HTTP_200_OK)

        # return Response(analysis_json, status=status.HTTP_200_OK)

        # # Generate Gemini analysis
        # analysis = analyze_resume_with_gemini(resume_text, job_description_text)
        # return Response({"analysis": analysis}, status=status.HTTP_200_OK)








