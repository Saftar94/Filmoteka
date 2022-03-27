// example
// pageRender(mainTittle.home)
// pageRender(mainTittle.my_library_watched)
// pageRender(mainTittle.my_library_queue)

import main from '../../views/layout/main.hbs';
import { refs } from '../refs/refs.js';
import mainTittle from '../data/main.json';
import backdrop_markup from '../../views/components/backdrop.hbs';
import { homeMarkUp, openInput } from '../layout/hero_home';
import modal_markup from '../../views/components/modal.hbs';
import svg from '../../images/svg/svg.svg';
import spinner from '../../views/components/spinner.hbs';
import { renderGallery } from '../layout/gallery'; 
import { primaryPagination } from '../components/pagination-list';
import { initGenres } from '../data/genres';
import blockHelpTemplate from '../../views/components/block_help.hbs';
import { blockhelpOpen } from '../components/block_help.js';
import { seorchId } from '../layout/modal_one_movie.js';
import filter from '../../views/components/filter/filter_sort.hbs';
import { initFilter } from '../filter/filter_sort';
import filterItemYear from '../data/filter_year_list.json';
import filterItemGenre from '../data/filter_genre_list.json';
import filterItemSort from '../data/filter_sort_list.json';
export function pageRender(value, heroValue, valueAdd, valueRemove) {
  const backdropMarkUp = backdrop_markup(modal_markup({ svg }));
  const spinnerMarkUp = spinner();
  const currentValue = value;
  const blockHelpMarkup = blockHelpTemplate({ svg });
  let markupFilter = '';
  if (value.hero_tittle === 'Search Movies') {
    markupFilter = filter({ svg, filterItemYear, filterItemGenre, filterItemSort });

  }
  refs.main.innerHTML = main({
    currentValue,
    backdropMarkUp,
    heroValue,
    spinnerMarkUp,
    blockHelpMarkup,
    markupFilter,
  });
  addHeroClass(valueAdd, valueRemove);
  if (value.hero_tittle === 'Search Movies') {
    openInput();
    initFilter();
  }
  // pagination
  primaryPagination();
  blockhelpOpen();
  seorchId();
}

function addHeroClass(valueAdd, valueRemove) {
  const heroRef = document.querySelector('.hero');
  heroRef.classList.add(`${valueAdd}`);
  heroRef.classList.remove(`${valueRemove}`);
}

pageRender(mainTittle.home, homeMarkUp, 'hero--home', 'hero--my-library');
initGenres()
  .then(renderGallery)
  .catch(renderGallery);

