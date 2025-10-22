from tkinter import *
from tkinter.messagebox import showinfo
from tkinter.filedialog import askopenfilename,asksaveasfilename
import os 

def newFile():
    global file
    root.title("My Notepad")
    file=None
    TextArea.delete(1.0,END)  #1.0 first line 0th character 
      
def openFile():
    global file
    file=askopenfilename(defaultextension=".txt",filetypes=[("All Files","*.*"),
                                                            ("Text Documents","*.txt")])
    if file == "":
        file=None
        
    else:
        root.title(os.path.basename(file)+" - Notepad")
        TextArea.delete(1.0,END)
        f = open(file,"r")
        TextArea.insert(1.0,f.read())
        f.close()

def saveFile():
    global file
    if file == None:
        file = asksaveasfilename(initialfile='MyNoteFile.txt',defaultextension=".txt",filetypes=[("All Files","*.*"),
                                                            ("Text Documents","*.txt")])
        if file == "":
            file=None
            
        else:
            #save s new file
            f = open(file,"w")
            f.write(TextArea.get(1.0,END))
            f.close()
            
            root.title(os.path.basename(file) + " - Notepad" )
            print("File Saved")
            
    else:
        # save the file
            f = open(file,"w")
            f.write(TextArea.get(1.0,END))
            f.close()
        
def quitApp():
    root.destroy()

def cut():
    TextArea.event_generate(("<<Cut>>")) #automatic handle internally cut 

def copy():
    TextArea.event_generate(("<<Copy>>")) #automatic handle internally cut 

def paste():
    TextArea.event_generate(("<<Paste>>")) #automatic handle internally cut 


def about():
    showinfo("Notepad","Notepad By Gayatri")

if __name__=='__main__':
    root=Tk()
    root.title("My Notepad")
    root.geometry("800x600")
    
    #Add TextArea
    TextArea = Text(root,font="lucida 13")
    file = None
    TextArea.pack(expand=True,fill=BOTH)
    
    # Lets create menu bar
    MenuBar = Menu(root)  #Horizontal menu
    # File Menu Starts
    FileMenu = Menu(MenuBar,tearoff=0)
    
    # To Open new file
    FileMenu.add_command(label="New",command=newFile)
    
    # To open already exixting file
    
    FileMenu.add_command(label="Open",command=openFile)
    
    #To save the current file
    FileMenu.add_command(label="Save",command=saveFile)
    FileMenu.add_separator()
    FileMenu.add_command(label="Exit",command=quitApp)
    MenuBar.add_cascade(label="File",menu = FileMenu)
     
    # Edit Menu Starts
    EditMenu = Menu(MenuBar,tearoff=0)
    
    # To give feature of cut,copy and paste
     
    EditMenu.add_command(label = "Cut",command=cut)
    EditMenu.add_command(label = "Copy",command=copy)
    EditMenu.add_command(label = "Paste",command=paste)
    
    MenuBar.add_cascade(label="Edit",menu=EditMenu)
    
    HelpMenu = Menu(MenuBar,tearoff=0)
    HelpMenu.add_command(label="About Notepad",command=about)
    MenuBar.add_cascade(label="Help",menu=HelpMenu)

    # Edit menu ends
    root.config(menu=MenuBar) 
    #Adding ScrollBar using rules from Tkinter lec 22
    Scroll=Scrollbar(TextArea)
    Scroll.pack(side=RIGHT,fill=Y)
    Scroll.config(command=TextArea.yview)
    TextArea.config(yscrollcommand=Scroll.set)
       
    root.mainloop()