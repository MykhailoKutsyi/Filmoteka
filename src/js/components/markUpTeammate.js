export default function markUpTeammate(data) {
  console.log(data);
  return data
    .map(({ id, image, name, role, about }) => {
      return `
    <li class="teammate-list__item" id=${id}>
        <div class="teammate-list__item--photo">
            <img src=${image}
                alt="${name}'s photo"
                width="30" />
        </div>
        <div class="teammate-list__item--description">
            <p class="teammate-list__item--name">${name}</p>
            <p class="teammate-list__item--role">${role}</p>
            <p class="teammate-list__item--about">${about}</p>
        </div>
    </li>
    `;
    })
    .join('');
}
