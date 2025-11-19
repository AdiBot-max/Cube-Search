import requests

# Replace with your RapidAPI key
RAPIDAPI_KEY = "404e0293ecmshad6bea346293be7p171d07jsnabb538c1b944"

def search_jobs(job, city):
    url = "https://jsearch.p.rapidapi.com/search"
    querystring = {
        "query": f"{job} jobs in {city}",
        "page": "1",
        "num_pages": "1",
        "country": "us",
        "date_posted": "all"
    }
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }

    try:
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()
        data = response.json()
        print(data)
    except requests.RequestException as e:
        print("Error fetching jobs:", e)

# Example usage:
search_jobs("developer", "chicago")
