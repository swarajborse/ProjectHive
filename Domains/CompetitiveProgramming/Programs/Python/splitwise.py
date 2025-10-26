from collections import defaultdict

class SplitwiseManager:


    def __init__(self):
        # Stores the net balance for each person: {person: balance}
        # Positive balance means the person is owed money (a creditor).
        # Negative balance means the person owes money (a debtor).
        # DSA: Hash Map / Dictionary for O(1) average time lookup/update.
        self.balances = defaultdict(float) 

    def add_expense(self, paid_by: str, amount: float, shared_by: list):
        if not shared_by:
            print("Error: Expense must be shared by at least one person.")
            return

        per_person_share = amount / len(shared_by)

        
        self.balances[paid_by] += (amount - per_person_share)

       
        for person in shared_by:
            if person != paid_by:
               
                self.balances[person] -= per_person_share
           
        self.balances[paid_by] += amount

       
        for person in shared_by:
            self.balances[person] -= per_person_share
            
        print(f"Expense added: {paid_by} paid ${amount}, shared by {shared_by}. Share: ${per_person_share:.2f}")

    def get_net_balances(self):
        """Returns the current net balances, rounded for display."""
       
        return {p: round(b, 2) for p, b in self.balances.items() if abs(b) > 0.01}


def settle_debts(balances: dict) -> list:
   
    transactions = []
    
    
    creditors = []
    debtors = []

    for person, balance in balances.items():
        if balance > 0.01: # Creditor
            creditors.append((balance, person))
        elif balance < -0.01: # Debtor
            debtors.append((-balance, person)) # Store absolute debt amount

    if not creditors or not debtors:
        return transactions # Debts are already settled

   
    creditors.sort(key=lambda x: x[0]) # (Balance, Person)
    debtors.sort(key=lambda x: x[0])   # (Debt, Person)

    while creditors and debtors:
       
        creditor_balance, creditor = creditors.pop()
        debtor_debt, debtor = debtors.pop()
        
       
        settle_amount = min(creditor_balance, debtor_debt)
        
       
        transactions.append({
            'from': debtor,
            'to': creditor,
            'amount': round(settle_amount, 2)
        })
        
        
        remaining_creditor_balance = creditor_balance - settle_amount
        remaining_debtor_debt = debtor_debt - settle_amount
        
        
        if remaining_creditor_balance > 0.01:
            creditors.append((remaining_creditor_balance, creditor))
            creditors.sort(key=lambda x: x[0]) 
        if remaining_debtor_debt > 0.01:
            debtors.append((remaining_debtor_debt, debtor))
            debtors.sort(key=lambda x: x[0]) # Re-sort to maintain "Max Heap" order
            
    return transactions



if __name__ == "__main__":
    splitwise = SplitwiseManager()

   
    splitwise.add_expense("Alice", 100, ["Alice", "Bob", "Charlie"]) 

   
    splitwise.add_expense("Bob", 10, ["Bob", "David"])
    
    
    splitwise.add_expense("Charlie", 50, ["Alice", "Bob", "Charlie", "David"])


    print("\n--- Final Net Balances ---")
    final_balances = splitwise.get_net_balances()
    for person, balance in final_balances.items():
        status = "is owed" if balance > 0 else "owes"
        print(f"{person}: {status} ${abs(balance):.2f}")
    
    
    print("\n--- Minimum Transaction Settlement ---")
    settlement_plan = settle_debts(final_balances)
    
    print(f"Total Transactions: {len(settlement_plan)}")
    for t in settlement_plan:
        print(f"💰 {t['from']} pays {t['to']} ${t['amount']:.2f}")