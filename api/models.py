from pydantic import BaseModel
from typing import Optional

class SpirometryData(BaseModel):
    DATA: Optional[str] = ""
    PRE_CVF: Optional[str] = ""
    CVF_PREVISTO: Optional[str] = ""
    POS_CVF: Optional[str] = ""
    PRE_FEV1: Optional[str] = ""
    FEV1_PREVISTO: Optional[str] = ""
    POS_FEV1: Optional[str] = ""
    PRE_FEV1_CVF: Optional[str] = ""
    FEV1_CVF_PREVISTO: Optional[str] = ""
    POS_FEV1_CVF: Optional[str] = ""
    PRE_FEF2575: Optional[str] = ""
    FEF2575_PREVISTO: Optional[str] = ""
    POS_FEF2575: Optional[str] = ""
    FEF2575_CVF: Optional[str] = ""