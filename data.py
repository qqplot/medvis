import pandas as pd
from datetime import datetime, timedelta

# 기존 데이터
data = {
    "country": ["Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Australia", "Austria", "Bahrain", "Bangladesh", "Belgium"],
    "continent": ["Asia", "Europe", "Africa", "Africa", "Americas", "Oceania", "Europe", "Asia", "Asia", "Europe"],
    "lifeExp": [43.828, 76.423, 72.301, 42.731, 75.32, 81.235, 79.829, 75.635, 64.062, 79.441],
    "pop": [31889923, 3600523, 33333216, 12420476, 40301927, 20434176, 8199783, 708573, 150448339, 10392226],
    "gdpPercap": [974.5803384, 5937.029526, 6223.367465, 4797.231267, 12779.37964, 34435.36744, 36126.4927, 29796.04834, 1391.253792, 33692.60508]
}

# 데이터 프레임 생성
df = pd.DataFrame(data)

# 날짜 범위 설정
start_date = datetime(2024, 1, 1)
days = 10

# 시간에 따른 변화 반영
expanded_data = []
for i in range(days):
    date = start_date + timedelta(days=i)
    temp_df = df.copy()
    temp_df['date'] = date
    temp_df['lifeExp'] += i * 0.1
    temp_df['pop'] *= (1 + i * 0.01)
    temp_df['gdpPercap'] *= (1 + i * 0.01)
    expanded_data.append(temp_df)

# 모든 데이터를 하나의 DataFrame으로 결합
final_df = pd.concat(expanded_data)

# CSV 파일로 저장 (예시)
final_df.to_csv("simulated_time_series_data.csv", index=False)
