while True:
    try:
        fator = int(input("Digite um número entre 1 e 10: "))
        while fator < 1 or fator > 10:
            print("Valor inválido")
            fator = int(input("Digite um número: "))
        for i in range(10):
            print(fator*(i+1))
        break
    except:
        print("Valor inválido")
        continue