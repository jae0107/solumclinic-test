# SOLUMCLINIC-TEST

## 📌 Overview
This repository contains solutions for three questions:
- **Question A**: Mystic Waves problem (Python solution)
- **Question B**: CargoCraft Fleet problem (Python solution)
- **Question C**: React login page with Zod validation and MUI (see its own README at `/Question_C/login/README.md`)

---

## ✅ Question A: Mystic Waves
**Description:**
Given `t` test cases, each with two integers `x` and `n`, compute the total energy after `n` waves:
- If `n` is even → output `0`
- If `n` is odd → output `x`

**Example:**
```
Input:
4
1 4
2 5
3 6
4 7

Output:

0
2
0
4
```

**Run the script:**
```bash
cd Question_A
python index.py
```
Provide input in the format:
```
t
x n
x n
...
```

---

## ✅ Question B: CargoCraft Fleet
**Description:**
Given `n` propulsion units, calculate the minimum and maximum number of spacecrafts:
- Type A uses 4 units
- Type B uses 6 units
- If `n` < 4 or odd → output `-1`
- Otherwise:
  - Minimum crafts → use as many 6-unit crafts as possible
  - Maximum crafts → use as many 4-unit crafts as possible

**Example:**
```
Input:
3
4
7
24

Output:

1 1
-1
4 6
```

**Run the script:**
```bash
cd Question_B
python index.py
```
Provide input in the format:
```
t
n
n
...
```

---

## ✅ Question C
For Question C (React login page), please refer to its dedicated README file located at:
```
/Question_C/login/README.md
```

---

## 🛠 Requirements
- Python 3.x

## ▶️ How to Run
Navigate to the respective folder and run the Python script using:
```bash
python index.py
```

## 📜 License
MIT
