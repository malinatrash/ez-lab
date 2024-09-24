from pydantic import BaseModel
from typing import List

class ReportRequest(BaseModel):
    institute: str
    podr: str
    group: str
    fio: str
    fio_prepod: str
    role: str
    work_type: str
    discipline: str
    topic: str
    chapters: List[str]
