import collections

ALL_NUMBERS = {1, 2, 3, 4, 5, 6, 7, 8, 9}

SUDOKU_BOARD = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

PEERS = {}
for r in range(9):
    for c in range(9):
        PEERS[(r, c)] = set()
        for i in range(9):
            if i != r: PEERS[(r, c)].add((i, c))
            if i != c: PEERS[(r, c)].add((r, i))
        
        box_r, box_c = (r // 3) * 3, (c // 3) * 3
        for i in range(box_r, box_r + 3):
            for j in range(box_c, box_c + 3):
                if (i, j) != (r, c):
                    PEERS[(r, c)].add((i, j))


def initialize_domains(board):
    """Initializes the domain (possible values set) for every cell."""
    
    domains = collections.defaultdict(lambda: set())
    
    for r in range(9):
        for c in range(9):
            pos = (r, c)
            if board[r][c] == 0:
                domains[pos] = ALL_NUMBERS.copy()
            
    
    for r in range(9):
        for c in range(9):
            pos = (r, c)
            if board[r][c] != 0:
                num = board[r][c]
                
                for pr, pc in PEERS[pos]:
                    domains[(pr, pc)].discard(num)
                        
    return domains



def revise(domains, pos_i, pos_j):
    
    r_i, c_i = pos_i
    r_j, c_j = pos_j
    
    revised = False
    
    
    if not domains[pos_i]: return False

    new_domain_i = domains[pos_i].copy()
    
    for x in domains[pos_i]: 
        if not domains[pos_j]:
            
            y = SUDOKU_BOARD[r_j][c_j] 
            if x == y:
                new_domain_i.discard(x)
                revised = True
        
       
        elif len(domains[pos_j]) == 1 and x in domains[pos_j]:
             new_domain_i.discard(x)
             revised = True

    
    if revised:
        domains[pos_i] = new_domain_i
    
    return revised

def mac_propagate(board, domains, initial_pos):
    
    changes = {}
    
   
    queue = collections.deque()
    for peer_pos in PEERS[initial_pos]:
        
        queue.append((peer_pos, initial_pos))

   
    while queue:
        pos_i, pos_j = queue.popleft()
        
       
        if board[pos_i[0]][pos_i[1]] == 0: 
        
            
            if revise(domains, pos_i, pos_j):
                
                
                if not domains[pos_i]:
                   
                    return False
                
               
                for peer_k in PEERS[pos_i]:
                    if peer_k != pos_j:
                       
                        queue.append((peer_k, pos_i))

    return changes


def select_unassigned_variable_mrv(domains):
    
    min_size = float('inf')
    mrv_pos = None

    for r in range(9):
        for c in range(9):
            pos = (r, c)
            domain_size = len(domains[pos])
            
            
            if domain_size > 0 and domain_size < min_size:
                min_size = domain_size
                mrv_pos = pos
                
    return mrv_pos

def order_domain_values_lcv(domains, r, c):
    """Least Constraining Value (LCV) Heuristic."""
    pos = (r, c)
    domain = list(domains[pos])
    value_costs = {}
    
    for num in domain:
        constraining_count = 0
        for pr, pc in PEERS[pos]:
            peer_pos = (pr, pc)
            
            if len(domains[peer_pos]) > 0 and num in domains[peer_pos]:
                constraining_count += 1
        
        value_costs[num] = constraining_count
        
    
    return sorted(domain, key=lambda num: value_costs[num])



def solve_mac(board, domains):
    
    
    pos = select_unassigned_variable_mrv(domains)
    if pos is None:
       
        return True
    
    r, c = pos
    
   
    sorted_values = order_domain_values_lcv(domains, r, c)
    
    for num in sorted_values:
        
       
        domains_snapshot = {k: v.copy() for k, v in domains.items()}
        
        
        board[r][c] = num
        
       
        domains[(r, c)] = {num} 
        
        
        mac_result = mac_propagate(board, domains, pos)
        
        if mac_result is not False:
            
            domains[(r, c)] = set() 
            
           
            if solve_mac(board, domains):
                return True
            
        
        board[r][c] = 0 
        domains.clear()
        domains.update(domains_snapshot) 
            
   
    return False



def print_board(board):
    
    for i in range(9):
        if i % 3 == 0 and i != 0:
            print("- - - - - - - - - - - -")

        for j in range(9):
            if j % 3 == 0 and j != 0:
                print(" | ", end="")

            if j == 8:
                print(board[i][j])
            else:
                print(str(board[i][j]) + " ", end="")



print("--- Unsolved Board ---")
print_board(SUDOKU_BOARD)


working_board = [row[:] for row in SUDOKU_BOARD]


initial_domains = initialize_domains(working_board)


if solve_mac(working_board, initial_domains):
    print("\n--- Solved Board (MAC-3, MRV, LCV) ---")
    print_board(working_board)
else:
    print("\nNo solution exists for this board.")