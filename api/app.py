from dotenv import load_dotenv
import os

load_dotenv()  # This loads environment variables from the .env file

# Now let's print them out to ensure they are loaded correctly
print("SUPABASE_URL:", os.getenv("SUPABASE_URL"))
print("SUPABASE_KEY:", os.getenv("SUPABASE_KEY"))
