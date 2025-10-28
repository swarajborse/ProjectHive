# Movie Recommendation System

A simple content-based movie recommendation system using cosine similarity. This project recommends movies similar to a given movie based on genres, keywords, and other features.

## Features

- Content-based filtering using movie metadata
- Cosine similarity for finding similar movies
- Simple and intuitive interface
- Pre-trained model included

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```python
python recommend.py
```

## Project Structure

```
MovieRecommender/
├── README.md
├── requirements.txt
├── recommend.py       # Main recommendation script
├── data/
│   └── movies.csv    # Sample movie dataset
└── utils.py          # Helper functions
```

## How It Works

1. Loads movie dataset with features like genres, keywords, etc.
2. Creates feature vectors using TF-IDF
3. Calculates cosine similarity between movies
4. Returns top N most similar movies

## Example

```python
from recommend import get_recommendations

# Get movies similar to "The Dark Knight"
recommendations = get_recommendations("The Dark Knight", n=5)
print(recommendations)
```

## Technologies Used

- Python 3.8+
- Pandas
- Scikit-learn
- NumPy

## Future Enhancements

- Add collaborative filtering
- Implement hybrid recommendation system
- Add web interface with Flask/Streamlit
- Include user ratings and reviews

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## License

MIT License

---

**Contributor:** [Sukarth](https://github.com/Sukarth)
