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

        pdf_content = input_pdf_setup(resume_file)
        suggestions = get_gemini_response(pdf_content, jd)
        return Response({"suggestions": suggestions})


