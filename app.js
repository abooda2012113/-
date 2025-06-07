
const data = JSON.parse(localStorage.getItem("finance-data")) || [];

function render() {
  document.getElementById("app").innerHTML = \`
    <button onclick="addRecord()">➕ إضافة عملية</button>
    <button onclick="exportData()">📤 تصدير</button>
    <ul>
      \${data.map(item => \`<li>\${item.date} - [\${item.type}] \${item.amount} ل.س - \${item.note}</li>\`).join('')}
    </ul>
  \`;
}
function addRecord() {
  const type = prompt("النوع: مدفوع/مقبوض/دين؟");
  const amount = prompt("المبلغ؟");
  const note = prompt("بيان؟");
  data.push({ type, amount, note, date: new Date().toLocaleString() });
  localStorage.setItem("finance-data", JSON.stringify(data));
  render();
}
function exportData() {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "finance-data.json";
  a.click();
}
render();
