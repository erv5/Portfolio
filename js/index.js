const codeGallery = {
	init: (selector) => {
		$.getJSON('/json/projects.json', function(projects){
			let html = '';
			for (let project of projects){
				html += `
				<div class="col-4 col-md-2 project">
					<div class="project-container">
						${codeGallery.icon(project.name, project.icon, project.link)}
					</div>
				</div>
				`;
			}
			$(selector).html(html);
		});
	},
	icon: (name, img, href) => {
		return `
			<div class="icon-column">
			 	<a class="project-icon" target="_blank" href="${href}">
					<img src="${img}">
				</a>
				<a class="project-title" target="_blank" href="${href}">
					<h4>${name}</h4>
				</a>
			</div>
		`;
	},
	description: (description, tools, code) => {
		let html = `
			<div class="project-description col-12 col-xs-8">
				<p>${description}</p>
				<p><a target="_blank" href="${code}">Source Code</a></p>
				<p>Built with:</p>
				<small>`;
				for(let tool of tools){ html += tool+"&nbsp;" }
		html += `
				</small>
			</div>
		`;
		return html;
	}
}

const artGallery = {
	init: (selector) => {
		let images = [
			'/images/art/buu.jpg',
			'/images/art/nimbus.jpg',
			'/images/art/starman.jpg',

			'/images/art/gohan.jpg',
			'/images/art/gohan.jpg',
			'/images/art/gohan.jpg',
			//'/images/art/gohan.jpg',
			//'/images/art/gohan.jpg',

			//'/images/art/gohan.jpg',
			//'/images/art/gohan.jpg',

			//'/images/art/gohan.jpg',
			//'/images/art/gohan.jpg',

		];
		let html = '';
		for (let image of images){
			html += artGallery.image(image);
		}
		$(selector).html(html);
		$(selector).lightGallery();
		artGallery.masonry(selector);
	},
	masonry: (selector) => {
		let image_grid = $(selector).isotope({
			itemSelector: '.grid-item',
			masonry: {
				percentPosition: true,
				gutter: 20,
			}
		});
		// Update masonry layout after each image loads
		image_grid.imagesLoaded().progress(()=>{
			image_grid.isotope('layout');
		});
	},
	image: (image) => {
		return `
			<div class="grid-item" data-src="${image}" data-download-url="${image}">
				<img src="${image}"/>
				<div class="hover-icon">
					<span><i class="fa fa-search"></i></span>
				</div>
			</div>
		`;
	}
}

function showHideNav(){

}

$(document).ready(() => {
	codeGallery.init('#project-gallery');
	artGallery.init('#art-gallery .masonry-grid');
});
