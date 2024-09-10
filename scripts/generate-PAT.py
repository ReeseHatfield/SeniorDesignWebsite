import os


num_dashes = 10
intro_string = "BEGIN PAT"
outro_string = "END PAT"

print("Make sure this is ran as cwd = scripts/")

path_to_pat_dir = os.path.join(os.getcwd(), "../backend/pat/")
abs_path = os.path.realpath(path_to_pat_dir)

print(abs_path)


header = f"{'-' * num_dashes}{intro_string}{'-' * num_dashes}\n"
key = os.urandom(128).hex() + "\n" 
footer = f"{'-' * num_dashes}{outro_string}{'-' * num_dashes}\n"


pat = header + key + footer

with open("PAT", "w") as f:
    f.write(pat)

with open(os.path.join(abs_path, "PAT"), "w") as f:
    f.write(pat)


print("Successfully generate personal access token")