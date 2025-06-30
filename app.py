from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import json
from datetime import datetime

app = Flask(__name__, static_folder='frontend/build')
CORS(app)

# Mock data for demonstration
mock_consultations = [
    {
        "id": 1,
        "patient_name": "فاطمة أحمد",
        "patient_name_en": "Fatima Ahmed",
        "date": "2025-06-24",
        "doctor": "د. هدى",
        "doctor_en": "Dr. Huda",
        "specialty": "أمراض النساء والتوليد",
        "specialty_en": "OB/GYN",
        "status": "مكتمل",
        "status_en": "Completed"
    },
    {
        "id": 2,
        "patient_name": "ليلى محمد",
        "patient_name_en": "Layla Mohamed",
        "date": "2025-06-25",
        "doctor": "د. هدى",
        "doctor_en": "Dr. Huda",
        "specialty": "أمراض النساء والتوليد",
        "specialty_en": "OB/GYN",
        "status": "قيد التقدم",
        "status_en": "In Progress"
    }
]

# Mock transcript data for the OB/GYN consultation
mock_transcript = [
    {"speaker": "doctor", "text": "السلام عليكم Fatima, how are you feeling today?", "timestamp": "00:00:03", "highlighted": False},
    {"speaker": "patient", "text": "الحمد لله I'm okay, but I've been having some آلام في البطن for the past week.", "timestamp": "00:00:08", "highlighted": True},
    {"speaker": "doctor", "text": "I see. هل يمكنك وصف الألم؟ Is it constant or does it come and go?", "timestamp": "00:00:15", "highlighted": False},
    {"speaker": "patient", "text": "It comes and goes, خاصة during my period. It's been getting worse.", "timestamp": "00:00:22", "highlighted": True},
    {"speaker": "doctor", "text": "Hmm, sounds like it could be dysmenorrhea. When was your آخر دورة شهرية?", "timestamp": "00:00:30", "highlighted": False},
    {"speaker": "patient", "text": "About two weeks ago. كانت أكثر إيلامًا من المعتاد.", "timestamp": "00:00:37", "highlighted": True}
]

# Mock missing information alert
mock_missing_info = {
    "field": "LMP (Last Menstrual Period)",
    "field_ar": "آخر دورة شهرية",
    "description": "Exact date of last menstrual period not mentioned",
    "description_ar": "لم يتم ذكر التاريخ الدقيق لآخر دورة شهرية",
    "importance": "high"
}

# Mock SOAP note
mock_soap = {
    "subjective": "25-year-old female patient presenting with increasing abdominal pain during menstruation. Patient reports pain has worsened over the last 3 cycles. No reported changes in flow volume or duration.",
    "subjective_ar": "مريضة أنثى تبلغ من العمر 25 عاماً تعاني من زيادة آلام البطن أثناء الدورة الشهرية. تفيد المريضة بأن الألم قد ازداد سوءاً خلال آخر 3 دورات. لا تغييرات مذكورة في حجم أو مدة التدفق.",
    "objective": "Vital signs stable. Abdominal examination reveals mild tenderness in the lower quadrants. No masses palpated.",
    "objective_ar": "العلامات الحيوية مستقرة. يكشف فحص البطن عن حساسية خفيفة في الأرباع السفلية. لا كتل محسوسة.",
    "assessment": "Likely dysmenorrhea. Consider further evaluation for endometriosis if symptoms persist or worsen.",
    "assessment_ar": "على الأرجح عسر الطمث. يجب النظر في مزيد من التقييم لبطانة الرحم المهاجرة إذا استمرت الأعراض أو تفاقمت.",
    "plan": "1. Prescribed NSAIDs for pain management\n2. Recommend heating pad application\n3. Follow up in 1 month\n4. Consider hormonal contraception if symptoms persist",
    "plan_ar": "١. وصف مضادات الالتهاب غير الستيرويدية لإدارة الألم\n٢. ينصح باستخدام وسادة التدفئة\n٣. متابعة بعد شهر واحد\n٤. النظر في وسائل منع الحمل الهرمونية إذا استمرت الأعراض"
}

# Mock ICD-10 codes
mock_icd_codes = [
    {"code": "N94.6", "description": "Dysmenorrhea", "confidence": 0.92},
    {"code": "N80.0", "description": "Endometriosis of uterus", "confidence": 0.65},
    {"code": "R10.2", "description": "Pelvic and perineal pain", "confidence": 0.58}
]

# Mock statistics for dashboard
mock_statistics = {
    "monthly_consultations": [
        {"month": "January", "count": 45},
        {"month": "February", "count": 52},
        {"month": "March", "count": 48},
        {"month": "April", "count": 61},
        {"month": "May", "count": 58},
        {"month": "June", "count": 64}
    ],
    "top_diagnoses": [
        {"diagnosis": "Dysmenorrhea", "diagnosis_ar": "عسر الطمث", "count": 38},
        {"diagnosis": "Pregnancy Check", "diagnosis_ar": "فحص الحمل", "count": 32},
        {"diagnosis": "PCOS", "diagnosis_ar": "متلازمة المبيض المتعدد الكيسات", "count": 27},
        {"diagnosis": "UTI", "diagnosis_ar": "التهاب المسالك البولية", "count": 21},
        {"diagnosis": "Endometriosis", "diagnosis_ar": "بطانة الرحم المهاجرة", "count": 18}
    ],
    "consultation_types": [
        {"type": "Initial Consultation", "type_ar": "استشارة أولية", "count": 150},
        {"type": "Follow-up", "type_ar": "متابعة", "count": 210},
        {"type": "Urgent Care", "type_ar": "رعاية عاجلة", "count": 45}
    ],
    "efficiency_metrics": {
        "avg_consultation_time": 18.5, # minutes
        "avg_report_generation_time": 3.2, # minutes
        "avg_transcription_accuracy": 0.94, # 94%
        "avg_icd_code_confidence": 0.87 # 87%
    }
}

# Mock reports data
mock_reports = [
    {
        "id": 101,
        "patient_name": "فاطمة أحمد",
        "patient_name_en": "Fatima Ahmed",
        "date": "2025-06-24",
        "type": "تقرير استشارة",
        "type_en": "Consultation Report",
        "doctor": "د. هدى",
        "doctor_en": "Dr. Huda",
        "specialty": "أمراض النساء والتوليد",
        "specialty_en": "OB/GYN",
        "icd_codes": ["N94.6", "N80.0"],
        "symptoms": "آلام في البطن",
        "symptoms_en": "Abdominal Pain"
    },
    {
        "id": 102,
        "patient_name": "ليلى محمد",
        "patient_name_en": "Layla Mohamed",
        "date": "2025-06-20",
        "type": "تقرير متابعة",
        "type_en": "Follow-up Report",
        "doctor": "د. هدى",
        "doctor_en": "Dr. Huda",
        "specialty": "أمراض النساء والتوليد",
        "specialty_en": "OB/GYN",
        "icd_codes": ["O20.0"],
        "symptoms": "نزيف خفيف",
        "symptoms_en": "Light Bleeding"
    },
    {
        "id": 103,
        "patient_name": "سارة خالد",
        "patient_name_en": "Sara Khalid",
        "date": "2025-06-18",
        "type": "تقرير استشارة",
        "type_en": "Consultation Report",
        "doctor": "د. هدى",
        "doctor_en": "Dr. Huda",
        "specialty": "أمراض النساء والتوليد",
        "specialty_en": "OB/GYN",
        "icd_codes": ["Z34.0"],
        "symptoms": "فحص روتيني للحمل",
        "symptoms_en": "Routine Pregnancy Check"
    },
    {
        "id": 104,
        "patient_name": "نورا عبدالله",
        "patient_name_en": "Noura Abdullah",
        "date": "2025-06-15",
        "type": "تقرير متابعة",
        "type_en": "Follow-up Report",
        "doctor": "د. هدى",
        "doctor_en": "Dr. Huda",
        "specialty": "أمراض النساء والتوليد",
        "specialty_en": "OB/GYN",
        "icd_codes": ["Z30.9"],
        "symptoms": "استشارة تنظيم الأسرة",
        "symptoms_en": "Family Planning Consultation"
    }
]

@app.route('/api/consultations', methods=['GET'])
def get_consultations():
    return jsonify(mock_consultations)

@app.route('/api/transcript/<int:consultation_id>', methods=['GET'])
def get_transcript(consultation_id):
    # For demo purposes, always return the mock transcript
    return jsonify(mock_transcript)

@app.route('/api/missing-info/<int:consultation_id>', methods=['GET'])
def get_missing_info(consultation_id):
    # For demo purposes, always return the mock missing info
    return jsonify(mock_missing_info)

@app.route('/api/soap/<int:consultation_id>', methods=['GET'])
def get_soap(consultation_id):
    # For demo purposes, always return the mock SOAP note
    return jsonify(mock_soap)

@app.route('/api/icd-codes/<int:consultation_id>', methods=['GET'])
def get_icd_codes(consultation_id):
    # For demo purposes, always return the mock ICD codes
    return jsonify(mock_icd_codes)

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    # In real app, retrieve statistics from database
    return jsonify(mock_statistics)

@app.route('/api/reports', methods=['GET'])
def get_reports():
    # In real app, retrieve reports from database
    return jsonify(mock_reports)

@app.route('/api/reports/<int:report_id>', methods=['GET'])
def get_report_details(report_id):
    # In real app, retrieve specific report by ID
    for report in mock_reports:
        if report["id"] == report_id:
            return jsonify(report)
    return jsonify({"error": "Report not found"}), 404

@app.route('/api/save-to-emr', methods=['POST'])
def save_to_emr():
    # Mock EMR integration
    return jsonify({"success": True, "message": "Note pushed to EMR successfully"})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
