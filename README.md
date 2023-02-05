# Financy
Financy merupakan web Financial Planner multiuser yang dapat menyimpan saldo dan riwayat transaksi untuk masing masing pengguna.

# How to Use
- Jalankan main.py untuk membuat database.db (install python library yang diperlukan)
- Ketik "uvicorn main:app --reload" pada terminal untuk mengaktifkan server
- Financy dapat digunakan

# Notes
Data-data disimpan di database dengan nama database.db dengan format:

[{
  "balance":0,
  "user":"User",
  "id":1,
  "history":"Expense : 0 ,Income : 0,"
}]
