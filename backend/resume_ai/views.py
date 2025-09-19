# # resume_ai/views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .utils import input_pdf_setup, get_gemini_response

# class ResumeAnalyzeView(APIView):
#     def post(self, request):
#         jd = request.data.get("job_description")
#         resume_file = request.FILES.get("resume")
#         if not jd or not resume_file:
#             return Response({"error": "Both JD and resume file are required"}, status=400)

#         pdf_content = input_pdf_setup(resume_file)
#         suggestions = get_gemini_response(pdf_content, jd)
#         return Response({"suggestions": suggestions})


# resume_ai/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import input_pdf_setup, get_gemini_response


class ResumeAnalyzeView(APIView):
    def post(self, request):
        jd = request.data.get("job_description")
        resume_file = request.FILES.get("resume")

        if not jd or not resume_file:
            return Response({"error": "Both JD and resume file are required"}, status=400)

        # Convert resume into image
        pdf_content = input_pdf_setup(resume_file)

        # Build a structured prompt for ATS scoring
        prompt = f"""
        You are an ATS (Applicant Tracking System). Compare this resume with the job description.
        Provide:
        1. An ATS compatibility score (0-100%).
        2. A short explanation of why the score was given.
        3. Key suggestions to improve the resume for this JD.

        Job Description:
        {jd}
        """

        result = get_gemini_response(pdf_content, prompt)

        # Try parsing ATS score
        ats_score, explanation, suggestions = None, None, result
        try:
            # Expect format like: "ATS Score: 75%\nExplanation: ...\nSuggestions: ..."
            lines = result.splitlines()
            for line in lines:
                if "score" in line.lower():
                    ats_score = line.split(":")[-1].strip()
                elif "explanation" in line.lower():
                    explanation = line.split(":", 1)[-1].strip()
        except Exception:
            pass

        return Response({
            "ats_score": ats_score or "N/A",
            "explanation": explanation or "N/A",
            "suggestions": suggestions
        })
