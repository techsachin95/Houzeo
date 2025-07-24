$(document).ready(function () {
  $('.filter-btn').click(function (e) {
    e.stopPropagation();

    const dropdownId = $(this).data('dropdown');
    if (!dropdownId) return;

    const $dropdown = $('#' + dropdownId);
    // Close all other dropdowns
    $('.dropdown-menu').not($dropdown).slideUp(150);

    // Get button position relative to .filter-section
    const $container = $('.filter-section');
    const containerOffset = $container.offset();
    const btnOffset = $(this).offset();

    // Calculate position of dropdown relative to container
    const top = btnOffset.top - containerOffset.top + $(this).outerHeight() + 5; // 5px margin
    const left = btnOffset.left - containerOffset.left;

    // Set dropdown position dynamically
    $dropdown.css({
      position: 'absolute',
      top: top + 'px',
      left: left + 'px',
      minWidth: $(this).outerWidth() + 'px',
      zIndex: 1000,
    });

    // Toggle dropdown visibility
    $dropdown.slideToggle(150);

    // Optional: add active class
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
  });

  // Close dropdown when clicking outside
  $(document).click(function () {
    $('.dropdown-menu').slideUp(150);
    $('.filter-btn').removeClass('active');
  });



  // Prevent closing dropdown when clicking inside
  $('.dropdown-menu').click(function (e) {
    e.stopPropagation();

  });


  // Dropdown option click
  $('.dropdown-menu li').click(function (e) {
    e.stopPropagation(); // prevent triggering document click

    const selectedText = $(this).text(); // get selected option text

    // Optional: update button text
    const $dropdown = $(this).closest('.dropdown-menu');
    const $button = $('.filter-btn[data-dropdown="' + $dropdown.attr('id') + '"]');

    $button.contents().filter(function () {
      return this.nodeType === 3; // update only text node
    }).first().replaceWith(selectedText + ' ');

    // ✅ Manually close the dropdown
    $dropdown.slideUp(150);
    $('.filter-btn').removeClass('active');
  });



  //heart iocon functionality
  $('.heart-icon').on('click', function () {
    $('.heart-icon').css({ display: 'none' })
    $('.redheart-icon').css({ display: 'block' })
  });
  $('.redheart-icon').on('click', function () {
    $('.heart-icon').css({ display: 'block' })
    $('.redheart-icon').css({ display: 'none' })
  });



  //property list
  const cardData = [
    {
      image: './images/Image1.svg',
      daysOnHouzeo: "6 days on Houzeo",
      liked: false,
      price: "$3,349,000",
      views: "2.3k",
      addressLine1: "2856 Meadow Park Ave,",
      addressLine2: "Henderson, NV 89052",
      rentedBy: "Nashville (Real Tracs Mid) MLS-TN as distributed by MLS GRID"
    },
    {
      image: './images/Image2.svg',
      daysOnHouzeo: "12 days on Houzeo",
      liked: false,
      price: "$3,349,000",
      views: "2.3K",
      addressLine1: "1000 Ocean View Dr,",
      addressLine2: "2856 Meadow Park Ave, Henderson, NV 89052",
      rentedBy: "Sotheby's International Realty"
    },
    {
      image: './images/Image3.svg',
      daysOnHouzeo: "5 days on Houzeo",
      liked: false,
      price: "$1,200,000",
      views: "1.1k",
      addressLine1: "1000 Ocean View Dr,",
      addressLine2: "2856 Meadow Park Ave, Henderson, NV 89052",
      rentedBy: "Nashville (Real Tracs Mid) MLS-TN as distributed by MLS GRID"
    },
    {
      image: './images/3.png',
      daysOnHouzeo: "10 days on Houzeo",
      liked: false,
      price: "$1,200,000",
      views: "1.1k",
      addressLine1: "1000 Ocean View Dr,",
      addressLine2: "2856 Meadow Park Ave, Henderson, NV 89052",
      rentedBy: "Nashville (Real Tracs Mid) MLS-TN as distributed by MLS GRID"
    },
    {
      image: './images/Image2.svg',
      daysOnHouzeo: "12 days on Houzeo",
      liked: false,
      price: "$1,200,000",
      views: "1.1k",
      addressLine1: "1000 Ocean View Dr,",
      addressLine2: "Los Angeles, CA 90210",
      rentedBy: "CRMLS as distributed by MLS GRID"
    }
  ];

  const container = document.querySelector('.card-container');

  cardData.forEach((data, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="card-head" style="position: relative;height: 200px;background-image: url(${data.image});background-size: cover;background-position: center;">
        <div class="card-head-icon">
          <div class="no-of-days poppins-medium">
            <p>${data.daysOnHouzeo}</p>
          </div>
          <div class="heart-icon" data-index="${index}" style="${data.liked ? 'display:none;' : 'display:block;'}">
            <img src="./images/heart.svg" alt="heart">
          </div>
          <div class="redheart-icon" data-index="${index}" style="${data.liked ? 'display:block;' : 'display:none;'}">
            <img src="./images/red-heart.svg" height="25px" width="25px" alt="red-heart">
          </div>
        </div>
        <div class="trgmns">
          <img src="./images/TrangleMns.svg" alt="trgmns">
        </div>
      </div>
      <div class="card-body">
        <div class="house-view">
          <div class="houseForSale">
            <p class="dot"></p>
            <p class="poppins-regular-difFont">House For Sale</p>
          </div>
          <div class="eye-view">
            <p><img src="./images/Eye.svg" alt="eye"></p>
            <p class="poppins-regular-difFont">${data.views}</p>
          </div>
        </div>
        <div class="house-details">
          <div class="poppins-semibold">${data.price}</div>
          <div class="beds"></div>
          <div class="baths"></div>
          <div class="sqft"></div>
        </div>
        <div class="house-address">
          <span class="poppins-medium maddress">${data.addressLine1}</span>
          <span class="poppins-regular-difFont">${data.addressLine2}</span>
        </div>
        <div class="hose-rented-by-co poppins-regular-difFont">
          ${data.rentedBy}
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Heart toggle logic (click to like/unlike)
  document.addEventListener('click', function (e) {
    if (e.target.closest('.heart-icon')) {
      const heart = e.target.closest('.heart-icon');
      const index = heart.dataset.index;
      heart.style.display = 'none';
      document.querySelector(`.redheart-icon[data-index="${index}"]`).style.display = 'block';
    } else if (e.target.closest('.redheart-icon')) {
      const redHeart = e.target.closest('.redheart-icon');
      const index = redHeart.dataset.index;
      redHeart.style.display = 'none';
      document.querySelector(`.heart-icon[data-index="${index}"]`).style.display = 'block';
    }
  });
});


