while True:
    try:
        nota = int(input("Digite um valor: "))
        while nota < 0 or nota > 10:
            print(f"Valor {nota} é invalido")
            nota = int(input("Digite um valor: "))
        break
    except:
        print(f"Valor digitado é inválido")
        continue