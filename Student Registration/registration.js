const form = document.getElementById('student-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const table = document.getElementById('student-table');
const message = document.getElementById('message');
let students = [];
function addStudent(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();
  if (!name || !email || !phone || !address) {
    message.textContent = 'Please fill out all fields.';
    return;
  }
  const newStudent = { name, email, phone, address };
  students.push(newStudent);
  renderStudents();
  form.reset();
  message.textContent = '';
}
function renderStudents() {
  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      ${students
        .map(
          (student, index) => `
          <tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.address}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
          </tr>
        `
        )
        .join('')}
    </tbody>
  `;
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) =>
    button.addEventListener('click', deleteStudent)
  );
}
function deleteStudent(event) {
  const index = event.target.dataset.index;
  students.splice(index, 1);
  renderStudents();
}
form.addEventListener('submit', addStudent);
