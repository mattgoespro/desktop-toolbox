import json

extensions_ids = []

with open("./extensions.json") as file:
    extensions = json.load(file)
    extensions_ids = [extension["identifier"]["id"] for extension in extensions]

installed_extensions = []

with open ("./.vscode/extensions.json") as file:
    installed_extensions = json.load(file)
    installed_extensions = installed_extensions["recommendations"]

# append all extensions that are not in the installed_extensions list to ./.vscode/extensions.json
for extension in extensions_ids:
    if extension not in installed_extensions:
        installed_extensions.append(extension)

with open("./.vscode/extensions.json", "w") as file:
    json.dump({"recommendations": installed_extensions}, file, indent=4)