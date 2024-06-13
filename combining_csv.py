import pandas as pd
import os

csv_directory = r"C:\Users\User\vscode\AutoBot\filess"

# List of CSV files to combine
csv_files = [
    'lahore_car_details.csv',
    'islamabad_car_details.csv',
    'karachi_car_details.csv',
    'faisalabad_car_details.csv',
    'rawalpindi_car_details.csv',
    'multan_car_details.csv'
]

csv_file_paths = [os.path.join(downloads_path, file) for file in csv_files]

# Initialize an empty list to hold dataframes
dataframes = []

# Read each CSV file into a dataframe and add it to the list
for file in csv_files:
    df = pd.read_csv(file)
    dataframes.append(df)

# Concatenate all dataframes into one
combined_df = pd.concat(dataframes, ignore_index=True)

# Save the combined dataframe to a new CSV file
combined_df.to_csv('old_car_data.csv', index=False)

print("CSV files have been combined successfully!")
