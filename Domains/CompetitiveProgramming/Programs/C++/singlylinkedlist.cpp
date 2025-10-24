#include<iostream>
using namespace std;
struct Node {
  int data;
  Node* next;
  Node(int val) : data(val), next(nullptr) {}
};
class singlylinkedlist{
private: Node*head;
public: 
singlylinkedlist() : head(nullptr) {}
~singlylinkedlist() {
  Node* current = head;
  while (current != nullptr) {
    Node* nextNode = current->next;
    delete current;
    current = nextNode;
  }
head = nullptr;
}
//insertion operations

void insertatbeg(int val){
  Node* temp = new Node(val);
  temp->next=head;
  head=temp;
  cout<<"Inserted "<<val<<" at the beginning of the list."<<endl;
}

void insertatend(int val){
  Node* temp = new Node(val);
  if(head==nullptr){
    head=temp;
    cout<<"Inserted "<<val<<" at the end of the list."<<endl;
    return;
  }
  Node* current=head;
  while(current->next!=nullptr){
    current=current->next;
  }
  current->next=temp;
  cout<<"Inserted "<<val<<" at the end of the list."<<endl;
}

void insertatpos(int val, int pos){
  if(pos<0){
    cout<<"Invalid position!"<<endl;
    return;
  }
  if(pos==0){
    insertatbeg(val);
    return;
  }
  Node* temp=new Node(val);
  Node* current=head;
  for(int i=0;i<pos-1;i++){
    if(current==nullptr){
      cout<<"Position not possible!"<<endl;
      delete temp;
      return;
    }
    current=current->next;
  }
  if(current==nullptr){
    cout<<"Position not possible!"<<endl;
    delete temp;
    return;
  }
  temp->next=current->next;
  current->next=temp;
  cout<<"Inserted "<<val<<" at position "<<pos<<"."<<endl;
}

//deletion operations

void deleteatbeg(){
  if(head==nullptr){
    cout<<"List is empty. Cannot delete."<<endl;
    return;
  }
  Node* temp=head;
  head=head->next;
  cout<<"Deleted "<<temp->data<<" from the beginning of the list."<<endl;
  delete temp;
}

void deleteatend(){
  if(head==nullptr){
    cout<<"List is empty. Cannot delete."<<endl;
    return;
  }
  if(head->next==nullptr){
    cout<<"Deleted "<<head->data<<" from the end of the list."<<endl;
    delete head;
    head=nullptr;
    return;
  }
  Node* current=head;
  while(current->next->next!=nullptr){
    current=current->next;
  }
  cout<<"Deleted "<<current->next->data<<" from the end of the list."<<endl;
  delete current->next;
  current->next=nullptr;
}

void deleteatpos(int pos){
  if(head==nullptr){
    cout<<"List is empty. Cannot delete."<<endl;
    return;
  }
  if(pos<0){
    cout<<"Invalid position!"<<endl;
    return;
  }
  if(pos==0){
    deleteatbeg();
    return;
  }
  Node* current=head;
  for(int i=0;i<pos-1;i++){
    if(current->next==nullptr){
      cout<<"Position not possible!"<<endl;
      return;
    }
    current=current->next;
  }
  if(current->next==nullptr){
    cout<<"Position not possible!"<<endl;
    return;
  }
  Node* temp=current->next;
  current->next=temp->next;
  cout<<"Deleted "<<temp->data<<" from position "<<pos<<"."<<endl;
  delete temp;
}

//search operation

void search(int val){
  Node* current=head;
  int pos=0;
  while(current!=nullptr){
    if(current->data==val){
      cout<<"Value "<<val<<" found at position "<<pos<<"."<<endl;
      return;
    }
    current=current->next;
    pos++;
  }
  cout<<"Value "<<val<<" not found in the list."<<endl;
}

//display operation

void display(){
  Node* current=head;
  if(current==nullptr){
    cout<<"The list is empty."<<endl;
    return;
  }
  cout<<"Linked List: ";
  while(current!=nullptr){
    cout<<current->data<<" -> ";
    current=current->next;
  }
  cout<<"nullptr"<<endl;
}

//reverse operation

int reverse(){
  Node* prev=nullptr;
  Node* current=head;
  Node* next=nullptr;
  while(current!=nullptr){
    next=current->next;
    current->next=prev;
    prev=current;
    current=next;
  }
  head=prev;
  cout<<"The list has been reversed."<<endl;
  return 0;

}

};

int main(){
  singlylinkedlist sll;
  sll.insertatend(10);
  sll.insertatbeg(5);
  sll.insertatpos(7,1);
  sll.display();
  sll.deleteatpos(1);
  sll.display();
  sll.deleteatbeg();
  sll.display();
  sll.deleteatend();
  sll.display();
  sll.insertatend(20);
  sll.insertatend(30);
  sll.search(20);
  sll.search(40);
  sll.display();
  sll.reverse();
  sll.display();
  return 0;
}