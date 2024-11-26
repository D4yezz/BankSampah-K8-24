let users = [];

function addData() {
  const name = document.getElementById("name").value;
  const kelas = document.getElementById("kelas").value;
  const jenisElements = document.querySelectorAll(".jenis");

  const jumlahElements = document.querySelectorAll(".jumlah");

  let dataAdded = false; 
  jenisElements.forEach((jenisElement, index) => {
    let jenis = jenisElement.value;

    const jumlah = parseFloat(jumlahElements[index].value);

    if (!name || !kelas || !jenis || isNaN(jumlah)) {
      alert("Harap isi semua data dengan benar.");
      return;
    }

    const hargaPerKg = {
      "Kantong Plastik": 1500,
      "Gelas Plastik": 3000,
      "Kemasan Makanan Ringan": 2000,
      "Kertas HVS Bekas": 2500,
      "Kardus Bekas": 2000,
      "Koran Bekas": 2000,
      "Kaleng Minuman": 5000,
      "Besi Tua": 3500,
      "Tutup Botol Logam": 4000,
      "Botol Kaca Bekas Minuman": 3000,
      "Botol Plastik": 2000,
      "Botol Parfum Kosong": 6000,
      Lainnya: 0,
    };

    const totalHarga = (hargaPerKg[jenis] || 0) * jumlah;

    const tableBody = document.getElementById("tableBody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tableBody.children.length + 1}</td>
      <td>${name}</td>
      <td>${kelas}</td>
      <td>${jenis}</td>
      <td>${jumlah}</td>
      <td>Rp. ${totalHarga.toLocaleString()}</td>
      <td>
        <button onclick="editRow(this)" class="edit">Edit</button>
        <button onclick="removeRow(this)" class="edit">Hapus</button>
        <button onclick="generateStruk('${name}', '${kelas}', '${jenis}', ${jumlah}, ${totalHarga})" class="edit btn-struk">Struk</button>
      </td>
    `;
    tableBody.appendChild(row);
    dataAdded = true; 
  });


  if (dataAdded) {
    hapusForm();
  }
}

// menambah sampah baru
function addSampahForm() {
  const sampahInputs = document.getElementById("sampahInputs");
  const newRow = document.createElement("table");
  newRow.innerHTML = `
  <tr>
    <td><label for="jenis">Jenis Sampah :</label></td>
    <td>
      <select name="jenis" class="jenis">
        <option value="" disabled selected>
          Pilih jenis sampah
        </option>
        <option value="Kantong Plastik">Kantong Plastik</option>
        <option value="Gelas Plastik">Gelas Plastik</option>
        <option value="Kemasan Makanan Ringan">Kemasan Makanan Ringan</option>
        <option value="Kertas HVS Bekas">Kertas HVS Bekas</option>
        <option value="Kardus Bekas">Kardus Bekas</option>
        <option value="Koran Bekas">Koran Bekas</option>
        <option value="Kaleng Minuman">Kaleng Minuman</option>
        <option value="Besi Tua">Besi Tua</option>
        <option value="Tutup Botol Logam">Tutup Botol Logam</option>
        <option value="Botol Kaca Bekas Minuman">Botol Kaca Bekas Minuman</option>
        <option value="Botol Plastik">Botol Plastik</option>
        <option value="Botol Parfum Kosong">Botol Parfum Kosong</option>
      </select>
    </td>
    </tr>
    <tr>
      <td><label for="jumlah">Jumlah Sampah(per kg):</label></td>
      <td><input type="number" class="jumlah" /></td>
    </tr>
  `;
  sampahInputs.appendChild(newRow);
}

function editRow(button) {
  const row = button.parentElement.parentElement;
  const cells = row.getElementsByTagName("td");

  const name = cells[1].innerText;
  const kelas = cells[2].innerText;
  const jenis = cells[3].innerText;
  const jumlah = parseFloat(cells[4].innerText);

  document.getElementById("name").value = name;
  document.getElementById("kelas").value = kelas;
  document.getElementById("jenis").value = jenis;
  document.getElementById("jumlah").value = jumlah;

  hapusForm();
}

function removeRow(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

function generateStruk(name, kelas, jenis, jumlah, totalHarga) {
  const strukSection = document.getElementById("struk");
  const strukContent = document.getElementById("strukContent");
  strukContent.innerHTML = `
  <table>
  <tr>
  <td>Nama :</td>
  <td>${name}</td>
  </tr>
  <tr>
  <td>Kelas :</td>
  <td>${kelas}</td>
  </tr>
  <tr>
  <td>Jenis Sampah :</td>
  <td>${jenis}</td>
  </tr>
  <tr>
  <td>Jumlah :</td>
  <td>${jumlah}</td>
  </tr>
  <tr>
  <td>Total Harga :</td>
  <td>Rp. ${totalHarga.toLocaleString()}</td>
  </tr>
  </table>
    
    
  `;
  strukSection.style.display = "block";
}

function hideStruk() {
  const strukSection = document.getElementById("struk");
  strukSection.style.display = "none";
}

// Kritik dan Saran
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzoLOq9o3u9NyLbg5hb3ijZn3WyNogSn37N6VSztK6-whQRGUU6NGCLrWqhr21sCu1p/exec";
const form = document.forms["kritik-saran"];
const btnKirim = document.querySelector(".btn-kritik");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // submit bang
  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");
      myAlert.classList.toggle("d-none");
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});

// document
//   .getElementById("kritik")
//   .addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const form = e.target;
//     const data = {
//       Nama: form.name.value,
//       Email: form.email.value,
//       Pesan: form.pesan.value,
//     };

//     try {
//       const response = await fetch("YOUR_SCRIPT_URL", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const result = await response.json();
//       if (result.result === "success") {
//         alert("Terima kasih atas masukan Anda!");
//         form.reset();
//       } else {
//         alert("Terjadi kesalahan, coba lagi.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Terjadi kesalahan, coba lagi.");
//     }
//   });

// const form = document.getElementById("kritik");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const data = {
//     nama: form.name.value,
//     email: form.email.value,
//     pesan: form.pesan.value,
//   };

//   console.log("Data yang dikirim:", data);

//   try {
//     const response = await fetch(
//       "https://script.google.com/macros/s/AKfycbxgahCFLYkTIbeqDNCEx9MfQJ9oA8wfgzh7r6iMWAXmwQAl1SQIMZyJCGuR5Uo570-yAw/exec",
//       {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Response status:", response.status);

//     if (response.ok) {
//       document.getElementById("response").textContent =
//         "Terima kasih atas masukan Anda!";
//       form.reset();
//     } else {
//       document.getElementById("response").textContent =
//         "Terjadi kesalahan, coba lagi.";
//     }
//   } catch (error) {
//     console.error("Error saat mengirim data:", error);
//     document.getElementById("response").textContent =
//       "Terjadi kesalahan, coba lagi.";
//   }
// });
function hapusForm() {
  document.getElementById("name").value = "";
  document.getElementById("kelas").value = "";

  const jenisElements = document.querySelectorAll(".jenis");
  jenisElements.forEach((jenis) => {
    jenis.selectedIndex = 0;
  });

  const jumlahElements = document.querySelectorAll(".jumlah");
  jumlahElements.forEach((jumlah) => {
    jumlah.value = "";
  });
}
