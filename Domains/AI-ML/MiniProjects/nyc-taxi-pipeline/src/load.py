
import duckdb
import os
import pandas as pd

def load_csv_to_duckdb(csv_path: str, duckdb_path: str, table_name: str = 'nyc_taxi_trips') -> str:
    """Load a CSV into a DuckDB database file."""
    os.makedirs(os.path.dirname(duckdb_path), exist_ok=True)
    print(f"Loading {csv_path} into DuckDB at {duckdb_path} (table: {table_name}) ...")
    con = duckdb.connect(duckdb_path)
    # create or replace table by reading csv
    con.execute("CREATE OR REPLACE TABLE {} AS SELECT * FROM read_csv_auto('{}') limit 0".format(table_name, csv_path))
    con.execute("INSERT INTO {} SELECT * FROM read_csv_auto('{}')".format(table_name, csv_path))

    # simple index-like optimization: run ANALYZE
    try:
        con.execute(f"ANALYZE {table_name}")
    except Exception:
        pass
    con.close()
    print(f"Loaded into DuckDB: {duckdb_path}")
    return duckdb_path


if __name__ == '__main__':
    import os
    for _, _, filenames in os.walk('./data/processed'):
        for filename in filenames:
            load_csv_to_duckdb(f'data/processed/{filename}', 'data/nyc_taxi.duckdb')
