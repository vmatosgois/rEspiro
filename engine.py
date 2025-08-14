from table2ascii import table2ascii, PresetStyle, Merge

def process_values(valores):
    """Testa os valores disponíveis um a um e tenta calcular valores relativos quando possível

    Args:
        valores (dict): Dicionário contendo entradas

    Returns:
        dict: dicionário modificado com valores relativos
    """
    
    comma = {key: valores[key].replace(',', '.') for key in valores.keys()}

    try:
        comma['PRE_FEV1_CVF'] = f"{round((float(comma['PRE_FEV1']) / float(comma['PRE_CVF'])) * 100, 1)}%"
    except:
        ...
        
    try:
        comma['POS_FEV1_CVF'] = f"{round((float(comma['POS_FEV1']) / float(comma['POS_CVF'])) * 100, 1)}%"
    except:
        ...
        
    try:  
        comma['FEF2575_CVF'] = f"{round(float(comma['PRE_FEF2575']) / float(comma['PRE_CVF']) * 100, 1)}%"
    except:
        ...
        
    try:
        comma['PRE_CVF'] = f"{comma['PRE_CVF']} ({round(float(comma['PRE_CVF']) / float(comma['CVF_PREVISTO']) * 100, 1)}%)"
    except:
        ...
        
    try:
        comma['PRE_FEV1'] = f"{comma['PRE_FEV1']} ({round(float(comma['PRE_FEV1']) / float(comma['FEV1_PREVISTO']) * 100, 1)}%)"
    except:
        ...
    
    try:
        comma['PRE_FEF2575'] = f"{comma['PRE_FEF2575']} ({round(float(comma['PRE_FEF2575']) / float(comma['FEF2575_PREVISTO']) * 100, 1)}%)"
    except:
        ...
        
    try:
        comma['POS_CVF'] = f"{comma['POS_CVF']} ({round(float(comma['POS_CVF']) / float(comma['CVF_PREVISTO']) * 100, 1)}%)"
    except:
        ...
        
    try:
        comma['POS_FEV1'] = f"{comma['POS_FEV1']} ({round(float(comma['POS_FEV1']) / float(comma['FEV1_PREVISTO']) * 100, 1)}%)"
    except:
        ...
    
    try:
        comma['POS_FEF2575'] = f"{comma['POS_FEF2575']} ({round(float(comma['POS_FEF2575']) / float(comma['FEF2575_PREVISTO']) * 100, 1)}%)"
    except:
        ...
        
    fill_empty = {key: 'NI' for key in comma.keys() if comma[key] == ''}
    resto = {chave: comma[chave] for chave in comma.keys() if chave not in fill_empty}
    
    fill_empty.update(resto)

    return fill_empty
    

def refine (valores):
    """Reorganiza dados brutos antes de enviar para geração de tabela

    Args:
        valores (dict): Dicionário contendo exames pré-processados

    Returns:
        list: Listas contendo cabeçalho e corpo da tabela
    """
    
    topo = ['ESPIROMETRIA', valores['DATA'] if valores['DATA'] != 'NI' else 'SEM DATA', '#####', '#####']
    
    corpo=[   ['#####', 'PRÉ-BD', 'PREV.', 'PÓS-BD']+ [Merge.LEFT]*(len(topo)-4),
              ["CVF:", valores['PRE_CVF'], valores['CVF_PREVISTO'], valores['POS_CVF']]+ [Merge.LEFT]*(len(topo)-4),
              ["FEV1:", valores['PRE_FEV1'], valores['FEV1_PREVISTO'], valores['POS_FEV1']]+ [Merge.LEFT]*(len(topo)-4),
              ['FEV1/CVF:', valores['PRE_FEV1_CVF'], valores['FEV1_CVF_PREVISTO'], valores['POS_FEV1_CVF']]+ [Merge.LEFT]*(len(topo)-4),
              ['FEF 25-75%:', valores['PRE_FEF2575'], valores['FEF2575_PREVISTO'], valores['POS_FEF2575']]+ [Merge.LEFT]*(len(topo)-4),
              ['FEF 25-75%/CVF:', valores['FEF2575_CVF'], '#####', '#####']+ [Merge.LEFT]*(len(topo)-4)]

    per_line = [['filler'],
                [valores['PRE_CVF'], valores['CVF_PREVISTO'], valores['POS_CVF']],
                [valores['PRE_FEV1'], valores['FEV1_PREVISTO'], valores['POS_FEV1']],
                [valores['PRE_FEV1_CVF'], valores['FEV1_CVF_PREVISTO'], valores['POS_FEV1_CVF']],
                [valores['PRE_FEF2575'], valores['FEF2575_PREVISTO'], valores['POS_FEF2575']],
                [valores['FEF2575_CVF']]]
    
    index = []
    
    for l, line in enumerate(per_line):
        for v, variable in enumerate(line):
            if variable != 'NI':
                break
            if v == len(line)-1 and variable == 'NI':
                index.append(l)
                
    index.reverse()
    
    for r in index:
        corpo.pop(r)
    
    return corpo, topo
    
def tabela(corpo, topo):
    """Gera tabela

    Args:
        corpo (list): Corpo da tabela
        topo (list): Cabeçalho da tabela

    Returns:
        str: Tabela
    """
    tabela = table2ascii(
        header=topo,
        body=corpo,
        footer=['© Victor Matos, 2024'] + [Merge.LEFT]*(len(topo)-1),
        style=PresetStyle.minimalist
    ).replace('─','=').replace('━','=')
    return tabela

def main_processing(valores: dict):
    """Inicia a subrotina a partir de uma amostra de dados

    Args:
        valores (dict): Entrada de exames do usuário

    Returns:
        str: Tabela
    """
    
    processed = process_values(valores)
    refined_corpo, refined_topo = refine(processed)
    output = tabela(refined_corpo, refined_topo)
    
    return output
