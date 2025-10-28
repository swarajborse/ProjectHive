#!/usr/bin/env python3
"""
Movie Recommendation System
A simple content-based movie recommender using cosine similarity.
"""

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class MovieRecommender:
    """Simple content-based movie recommendation system."""
    
    def __init__(self):
        self.movies_df = None
        self.tfidf_matrix = None
        self.cosine_sim = None
        
    def load_data(self, movies_data=None):
        """
        Load movie data. If no data provided, creates sample dataset.
        
        Args:
            movies_data: DataFrame with 'title' and 'features' columns
        """
        if movies_data is None:
            # Sample movie data for demonstration
            self.movies_df = pd.DataFrame({
                'title': [
                    'The Dark Knight',
                    'Inception',
                    'Interstellar',
                    'The Shawshank Redemption',
                    'Pulp Fiction',
                    'The Matrix',
                    'Fight Club',
                    'Forrest Gump',
                    'The Godfather',
                    'The Avengers'
                ],
                'features': [
                    'action superhero crime thriller dark',
                    'scifi thriller action heist dreams',
                    'scifi drama space exploration time',
                    'drama prison friendship hope redemption',
                    'crime drama nonlinear violence',
                    'scifi action cyberpunk virtual reality',
                    'drama psychological thriller twist',
                    'drama history life story heartwarming',
                    'crime drama mafia family power',
                    'action superhero team ensemble marvel'
                ]
            })
        else:
            self.movies_df = movies_data
            
    def build_model(self):
        """Build TF-IDF matrix and compute cosine similarity."""
        if self.movies_df is None:
            raise ValueError("No data loaded. Call load_data() first.")
            
        # Create TF-IDF matrix
        tfidf = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = tfidf.fit_transform(self.movies_df['features'])
        
        # Compute cosine similarity matrix
        self.cosine_sim = cosine_similarity(self.tfidf_matrix, self.tfidf_matrix)
        
    def get_recommendations(self, movie_title, n=5):
        """
        Get top N movie recommendations for a given movie.
        
        Args:
            movie_title: Title of the movie
            n: Number of recommendations to return
            
        Returns:
            List of recommended movie titles
        """
        if self.cosine_sim is None:
            raise ValueError("Model not built. Call build_model() first.")
            
        # Find index of the movie
        try:
            idx = self.movies_df[self.movies_df['title'] == movie_title].index[0]
        except IndexError:
            return f"Movie '{movie_title}' not found in database."
        
        # Get similarity scores for all movies with this movie
        sim_scores = list(enumerate(self.cosine_sim[idx]))
        
        # Sort movies by similarity score (excluding the movie itself)
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:n+1]
        
        # Get movie indices
        movie_indices = [i[0] for i in sim_scores]
        
        # Return recommended movie titles
        recommendations = self.movies_df.iloc[movie_indices]['title'].tolist()
        return recommendations


def main():
    """Main function to demonstrate the movie recommender."""
    print("=" * 50)
    print("Movie Recommendation System")
    print("=" * 50)
    
    # Initialize recommender
    recommender = MovieRecommender()
    
    # Load sample data
    print("\nLoading sample movie data...")
    recommender.load_data()
    
    # Build model
    print("Building recommendation model...")
    recommender.build_model()
    
    # Get recommendations
    movie = "The Dark Knight"
    print(f"\nMovies similar to '{movie}':")
    recommendations = recommender.get_recommendations(movie, n=5)
    
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec}")
    
    print("\n" + "=" * 50)
    print("Done! Feel free to modify the code and add your own movies.")
    print("=" * 50)


if __name__ == "__main__":
    main()
