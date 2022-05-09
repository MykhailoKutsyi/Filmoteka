import githubIcon from '../../images/github.png';
import linkedinIcon from '../../images/linkedin.png';
export default function markUpTeammate(data) {
  return data
    .map(({ id, image, name, role, about, link }) => {
      return `
    <li class="teammate-list__item" id=${id}>
      <a class="teammate-list__item--link" href=${link} target="_blank">
        <img class="teammate-list__item--image" src=${image} alt="${name}'s photo" width="100" >
      </a>
      <div class="teammate-list__item--description">
        <p class="teammate-list__item--name">${name}</p>
        <p class="teammate-list__item--role">${role}</p>
         <div class="teammate-list__item--socials">
        <a class="teammate-list__item--link" href=${link} target="_blank">
          <img class="teammate-list__item--icon" src=${githubIcon} alt="githubIcon" width=40px />
        </a>
        <a class="teammate-list__item--link" href=${link} target="_blank">
          <img class="teammate-list__item--image" src=${linkedinIcon} alt="githubIcon" width=60px />
        </a>
      </div>
        <p class="teammate-list__item--about">${about}</p>
      </div>
     
    </li>
    `;
    })
    .join('');
}
