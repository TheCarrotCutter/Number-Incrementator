import tkinter as tk

number = 0
increment_ammount = 1
loop = 1
idle_ammount = 0

def update():
  counter.config(text=number)
  button.config(text=f"Increment by + {increment_ammount}")
  number_a_sec.config(text=f"{idle_ammount}/sec", font=("Arial", 10))
  if number >= 100:
    increment_button["state"] = tk.NORMAL
  else:
    increment_button["state"] = tk.DISABLED
  if number >= 1000:
    idleinc["state"] = tk.NORMAL
  else:
    idleinc["state"] = tk.DISABLED
  if number >= 10000:
    idleinc_x10["state"] = tk.NORMAL
  else:
    idleinc_x10["state"] = tk.DISABLED
  if number >= 1000:
    increment_button_x10["state"] = tk.NORMAL
  else:
    increment_button_x10["state"] = tk.DISABLED
    

def increment():
  global number
  number = number + increment_ammount
  update()

def increment_upgrade():
  global increment_ammount
  global number
  increment_ammount = increment_ammount + 1
  number = number - 100
  update()

def increment_upgrade_x10():
  global increment_ammount
  global number
  increment_ammount = increment_ammount + 10
  number = number - 1000
  update()


def idle_timer():
  global number
  number = number + idle_ammount
  counter.config(text=number)
  window.after(1000, idle_timer)
  update()

def idle_ammount_increase():
  global idle_ammount
  global number
  number = number - 1000
  idle_ammount = idle_ammount + 1
  update()

def idle_upgrade_x10():
  global idle_ammount
  global number
  number = number - 10000
  idle_ammount = idle_ammount + 10
  update()

window = tk.Tk(className="Clicker")
counter = tk.Label(text=number, font=("Arial", 20))
counter.pack()

number_a_sec = tk.Label(text=f"{idle_ammount}/sec", font=("Arial", 10))

number_a_sec.pack()

button = tk.Button(text=f"Increment by + {increment_ammount}", command=increment, 
height=3, width=20, font=("Arial", 20))

button.pack()

increment_button = tk.Button(text="Increment Upgrade", command=increment_upgrade, height=3, 
width=20, 
font=("Arial", 20), state=tk.DISABLED)
increment_button.pack()


idleinc = tk.Button(text="Idle Upgrade", command=idle_ammount_increase, height=3, 
width=20, font=("Ariel", 15), state=tk.DISABLED)

idleinc_x10 = tk.Button(text="Idle Upgrade x10", command=idle_upgrade_x10, height=3, width=20, font=("Ariel", 15), state=tk.DISABLED)

idleinc_x10.pack()
idleinc_x10.place(x=20, y=150)

idleinc.pack()
idleinc.place(x=20, y=20)

idlecost = tk.Label(text="Cost: 1000", font=("Arial", 20))

idlecost.pack()
idlecost.place(x=20, y=110)

idlecost_x10 = tk.Label(text="Cost: 10000", font=("Arial", 20))

idlecost_x10.pack()
idlecost_x10.place(x=20, y=250)


costninc = tk.Label(text="Cost: 100", font=("Arial", 20))
costninc.pack()

increment_button_x10 = tk.Button(text="Increment Upgrade x10", command=increment_upgrade_x10, height=3, 
width=20, 
font=("Arial", 20), state=tk.DISABLED)

increment_button_x10.pack()

x10_increment_cost = tk.Label(text="Cost: 1000", font=("Arial", 20))

x10_increment_cost.pack()

window.after(1000, idle_timer)

window.mainloop()
