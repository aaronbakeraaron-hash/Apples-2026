document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-buttons button');
    const items = document.querySelectorAll('.portfolio-item');
    let activeFilters = []; 

    buttons.forEach(btn => {
        btn.onclick = () => {
            const filter = btn.getAttribute('data-filter');

            if (filter === 'all') {
               
                activeFilters = [];
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            } else {
             
                document.querySelector('[data-filter="all"]').classList.remove('active');
                
                // Toggle the filter in the array
                if (activeFilters.includes(filter)) {
                    activeFilters = activeFilters.filter(f => f !== filter);
                    btn.classList.remove('active');
                } else {
                    activeFilters.push(filter);
                    btn.classList.add('active');
                }
            }

  
            items.forEach(item => {
                const matches = activeFilters.some(f => item.classList.contains(f));
                
                if (filter === 'all') {
                    item.style.display = 'block';
                } else if (activeFilters.length === 0) {
                    item.style.display = 'none'; 
                } else if (matches) {
                    item.style.display = 'block'; 
                } else {
                    item.style.display = 'none';
                }
            });
        };
    });

 
    document.querySelectorAll('.overlay a').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            const imgSrc = link.closest('.portfolio-item').querySelector('img').src;
            
            const zoomBox = document.createElement('div');
            zoomBox.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;justify-content:center;align-items:center;z-index:1000;cursor:pointer;";
            zoomBox.innerHTML = `<img src="${imgSrc}" style="max-height:90%;max-width:90%;border:3px solid white;">`;
            
            document.body.appendChild(zoomBox);
            zoomBox.onclick = () => zoomBox.remove();
        };
    });
});
