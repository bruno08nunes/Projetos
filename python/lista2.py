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
    
soma = 0
menorValor = lista[0]
maiorValor = lista[0]
for i in lista:
    soma += i
    if i > maiorValor:
        maiorValor = i
    if i < menorValor:
        menorValor = i

print(f"O menor valor é: {menorValor} \nO maior valor é: {maiorValor} \nA soma de todos os valores é: {soma}")