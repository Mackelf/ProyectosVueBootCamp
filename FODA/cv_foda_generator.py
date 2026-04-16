# cv_foda_generator.py
import pdfplumber
import json
import re
import os
from datetime import datetime

# ---------------------------------------------------------
# 1. EXTRACCIÓN DE TEXTO DESDE PDF
# ---------------------------------------------------------
def extract_text_from_pdf(pdf_path: str) -> str:
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"❌ No se encontró: {pdf_path}")
    
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

# ---------------------------------------------------------
# 2. MOTOR DE ANÁLISIS FODA (HEURÍSTICO + REGLAS)
# ---------------------------------------------------------
def analyze_swot(text: str) -> dict:
    t = text.lower()
    
    # Patrones de fortalezas explícitas
    strength_patterns = [
        r"resolución.*90%", r"mentoría", r"capacitación", r"trabajo en equipo",
        r"adaptabilidad", r"soporte remoto", r"configuración.*(router|switch|red)",
        r"diagnóstico.*fibra", r"documentación", r"ticketing", r"gestión.*incidentes"
    ]
    strengths = [m.group(0).title() for p in strength_patterns for m in re.finditer(p, t)]
    
    # Debilidades explícitas
    weakness_patterns = [
        r"inglés.*intermedio", r"sin certificación", r"título.*antiguo",
        r"brecha", r"automatización", r"scripting", r"python|powershell"
    ]
    weaknesses = [m.group(0).title() for p in weakness_patterns for m in re.finditer(p, t)]
    
    # Inferencia de brechas por ausencia
    has_cloud = bool(re.search(r"cloud|aws|azure|gcp|saas", t))
    has_script = bool(re.search(r"python|powershell|bash|automatiz|script", t))
    has_cert = bool(re.search(r"certificaci|itil|comptia|cisco|microsoft", t))
    has_english_b2 = bool(re.search(r"inglés.*avanzado|b2|c1|c2|fluido", t))
    
    if not has_cloud: weaknesses.append("Falta experiencia/certificación en Cloud (AWS/Azure)")
    if not has_script: weaknesses.append("Sin scripting/automatización básica (Python/PowerShell)")
    if not has_cert: weaknesses.append("Sin certificaciones IT vigentes (ITIL, Network+, etc.)")
    if not has_english_b2: weaknesses.append("Inglés técnico por debajo de B2 (límite para multinacionales)")
    
    # Oportunidades y Amenazas (alineadas al mercado IT 2026)
    opportunities = [
        "Alta demanda de Soporte IT N2 y roles híbridos/remotos",
        "Certificaciones rápidas con alto ROI (ITIL 4, AWS/Azure Fundamentals)",
        "Sectores en digitalización acelerada: salud, fintech, gobierno, telecom",
        "Transición a roles de administración de redes o Cloud Support L1"
    ]
    threats = [
        "Automatización e IA reduciendo soporte L1 tradicional",
        "Competencia con perfiles jóvenes + certificaciones cloud/ciberseguridad",
        "Obsolescencia de stacks puramente hardware/on-premise",
        "Requisitos crecientes de inglés técnico B2+ en empresas globales"
    ]
    
    return {
        "strengths": list(dict.fromkeys(strengths)), # eliminar duplicados
        "weaknesses": list(dict.fromkeys(weaknesses)),
        "opportunities": opportunities,
        "threats": threats,
        "metadata": {"analyzed_at": datetime.now().isoformat()}
    }

# ---------------------------------------------------------
# 3. GENERADOR DE PLANES
# ---------------------------------------------------------
def generate_learning_plan(weaknesses: list) -> list:
    plan = []
    w_lower = [w.lower() for w in weaknesses]
    
    if any("cloud" in w for w in w_lower):
        plan.append({"focus": "Cloud Fundamentals", "course": "AWS Cloud Practitioner / Azure Fundamentals", "timeframe": "2 meses", "validation": "Certificación oficial + lab básico"})
    if any("scripting" in w or "automatización" in w for w in w_lower):
        plan.append({"focus": "Automatización IT", "course": "Python/PowerShell para SysAdmins", "timeframe": "3 meses", "validation": "3 scripts funcionales (ej: limpieza logs, reporte tickets)"})
    if any("certificaci" in w or "itil" in w for w in w_lower):
        plan.append({"focus": "Gestión de Servicios IT", "course": "ITIL 4 Foundation", "timeframe": "1-2 meses", "validation": "Examen aprobado + badge digital"})
    if any("inglés" in w for w in w_lower):
        plan.append({"focus": "Inglés Técnico", "course": "English for IT Professionals + práctica diaria", "timeframe": "3-6 meses", "validation": "Test EFSET B2 / entrevista simulada"})
    if any("redes" in w or "switch" in w or "router" in w for w in w_lower):
        plan.append({"focus": "Redes & Ciberseguridad Básica", "course": "CompTIA Network+ / Cisco CyberOps Intro", "timeframe": "4 meses", "validation": "Certificación o curso completo + labs Packet Tracer"})
    return plan

def generate_job_search_plan() -> dict:
    return {
        "Días 1-30": "Optimizar CV/LinkedIn, mapear 3 roles objetivo, 10-15 postulaciones/semana, networking estratégico",
        "Días 31-60": "Simulacros técnicos (STAR), CRM de seguimiento, 2 posts técnicos/mes en LinkedIn",
        "Días 61-90": "Entrevistas reales, negociación salarial, preparación de onboarding, revisión trimestral FODA"
    }

# ---------------------------------------------------------
# 4. EXPORTACIÓN
# ---------------------------------------------------------
def to_markdown(swot: dict, learning: list, job_plan: dict) -> str:
    md = "# 📊 Reporte FODA + Plan de Carrera\n\n"
    md += "## 💪 Fortalezas\n" + "\n".join([f"- {s}" for s in swot["strengths"]]) + "\n\n"
    md += "## ⚠️ Debilidades\n" + "\n".join([f"- {w}" for w in swot["weaknesses"]]) + "\n\n"
    md += "## 🔍 Oportunidades\n" + "\n".join([f"- {o}" for o in swot["opportunities"]]) + "\n\n"
    md += "## ⚡ Amenazas\n" + "\n".join([f"- {t}" for t in swot["threats"]]) + "\n\n"
    
    md += "## 📚 Plan de Aprendizaje\n"
    for item in learning:
        md += f"- **{item['focus']}**: {item['course']} ({item['timeframe']}) → {item['validation']}\n"
    
    md += "\n## 📅 Plan de Búsqueda Laboral\n"
    for phase, desc in job_plan.items():
        md += f"- **{phase}**: {desc}\n"
    return md

def main():
    PDF_PATH = "CV - Mario Andrés Canto Magüida.pdf"
    
    print("📖 Extrayendo texto del CV...")
    cv_text = extract_text_from_pdf(PDF_PATH)
    
    print("🔍 Analizando FODA...")
    swot = analyze_swot(cv_text)
    
    print("📚 Generando planes...")
    learning = generate_learning_plan(swot["weaknesses"])
    job_plan = generate_job_search_plan()
    
    # Exportar
    md_report = to_markdown(swot, learning, job_plan)
    json_output = {"swot": swot, "learning_plan": learning, "job_search_plan": job_plan}
    
    with open("foda_report.md", "w", encoding="utf-8") as f: f.write(md_report)
    with open("foda_data.json", "w", encoding="utf-8") as f: json.dump(json_output, f, indent=2, ensure_ascii=False)
    
    print("✅ Archivos generados:")
    print("   📄 foda_report.md (Listo para Notion)")
    print("   📦 foda_data.json (Para automatizaciones/APIs)")
    print("\n📋 VISTA PREVIA:")
    print(md_report)

if __name__ == "__main__":
    main()