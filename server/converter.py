import os
import re
import json

data = ''

def entre_letras_numeros(s):
    string = s[0][0] + "'" + s[0][2]
    return str(string)

def letra_tras(s):
    string = s[0][0] + s[0][1]
    return string

def letra_frente(s):
    string = s[0][1] + s[0][2]
    return string

def letra_tras(s):
    string = s[0][0] + s[0][1]
    return string

def letra_frente_espaco(s):
    string = s[0][1] + s[0][2] + s[0][3]
    return string

def letra_tras_espaco(s):
    string = s[0][0] + s[0][1] + s[0][2]
    return string

def tres_aspas(s):
    string = s[0][0] + s[0][1]
    return string

def final_dado(s):
    string = s[0][1]
    return string

def letra_espaco_aspas_letra(s):
    string = s[0][0] + s[0][1] + s[0][3]
    return string

def letra_aspas_espaco_letra(s):
    string = s[0][0] + s[0][2] + s[0][3]
    return string

def letra_aspas_espaco_letra2(s):
    print(len(s[0]))
    # string = s[0][0] + s[0][2] + s[0][3] + s[0][4]
    # string = s[0][0] + s[0][2] + s[0][3] + s[0][4]
    print("string:",  s[0][0])
    print("string:",  s[0][1])
    print("string:",  s[0][2])
    return s

def letra2_espaco_aspas_letra(s):
    print(len(s[0]))
    # string = s[0][0] + s[0][1] + s[0][2] + s[0][4]
    print("string:",  s[0][0])
    print("string:",  s[0][1])
    print("string:",  s[0][2])
    return s

def converter_txt():
    for arquivo in os.listdir(os.getcwd()):
        if arquivo != "converter.py": 
            print(f"Iniciando arquivo: {arquivo}")
            with open(str(arquivo), 'r', encoding="ISO-8859-1") as f:
                txt = f.read()  

            txt = "[" +txt+ "]"
            txt = txt.replace("'", '"')
            data = re.sub("[0-9A-Za-z]\"[0-9A-Za-z]", entre_letras_numeros, txt)
            data = re.sub("[0-9A-Za-z]\"\"", letra_tras, data )
            data = re.sub("\"\"[0-9A-Za-z]", letra_frente, data )
            data = re.sub("[0-9A-Za-z]\"\"", letra_tras, data )
            data = re.sub("\"\"\s[0-9A-Za-z]", letra_frente_espaco, data )
            data = re.sub("[0-9A-Za-z]\s\"\"", letra_tras_espaco, data )
            data = re.sub("[0-9A-Za-z][\s,]\"[0-9A-Za-z]", letra_espaco_aspas_letra, data )
            data = re.sub("[0-9A-Za-z]\"[\s,][0-9A-Za-z]", letra_aspas_espaco_letra, data )
            data = re.sub("[0-9A-Za-z.\\]\"[\s,][\\0-9A-Za-z\s.][\\0-9A-Za-z\s.]", letra_aspas_espaco_letra2, data )
            data = re.sub("[0-9A-Za-z\s.\\][0-9A-Za-z\s.\\][\s,]\"[\\0-9A-Za-z.]", letra2_espaco_aspas_letra, data )
            
            data = re.sub("\"\"\"", tres_aspas, data )
            data = re.sub(",\]", final_dado, data )
          
            data = data.replace('},', '},\n')
            novo_nome = arquivo.replace('.txt', '')

            with open(f'./{novo_nome}.json', 'w') as f:
                f.write(data)
            try:
                with open(f'./{novo_nome}.json', 'r') as f:
                    teste_json = json.load(f)
            except:
                print(f"Error: {arquivo}")
                os.abort()

            # os.remove(f'./{str(arquivo)}')

if __name__=="__main__":
    converter_txt()


