export default function markUpFilms(data) {
  console.log(data);
  return data
    .map(({ title }) => {
      return `
    <li class="photo-card">
        <p>${title}</p>
    </li>
    `;
    })
    .join('');
}
