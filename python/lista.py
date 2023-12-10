while True:
    try:
        n = int(input("Digite a quantidade de números digitados: "))
        lista = []
        for i in range(0, n):
            lista.append(int(input(f"Digite o {i+1}° número: ")))
        break
    except:
        print("Valor inválido")
        print("Digite desde o começo")
        continue

print(f"O menor valor é: {min(lista)} \nO maior valor é: {max(lista)} \nA soma de todos os valores é: {sum(lista)}")