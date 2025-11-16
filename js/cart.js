const total = document.querySelector(".total")
const subtotal = document.querySelector(".subtotal")
const express = document.querySelector("input[value='express']")
const premium = document.querySelector("input[value='premium']")
const standard = document.querySelector("input[value='standard']")

const selected = () => {
  if (premium?.checked) return 0.15
  if (express?.checked) return 0.07
  return 0.05
}

const updateTotal = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")

  const totalAmount = cart.reduce((acc, p) => {
    const cost = Number(p.cost) || 0
    const qty = Number(p.quantity) || 0
    const costUSD = p.currency === "UYU" ? cost / 40 : cost
    return acc + costUSD * qty
  }, 0)

  const envio = totalAmount * selected()
  const subtotalSinEnvio = totalAmount
  const totalConEnvio = subtotalSinEnvio + envio

  if (total) total.textContent = `Total: USD ${totalConEnvio.toFixed(2)}`
  if (subtotal) subtotal.textContent = `Subtotal: USD ${subtotalSinEnvio.toFixed(2)}`
};

document.addEventListener("totalAmountChanged", (e) => {
  const value = e?.detail?.value
  updateTotal(value)
})

[express, premium, standard].forEach((r) => {
  if (r) r.addEventListener("change", () => updateTotal())
})

updateTotal()
