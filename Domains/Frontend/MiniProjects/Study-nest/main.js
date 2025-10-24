// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Detailed Mock Data ---
    
    // 1. Core Data
    const branches = [
        { id: 'Comp', name: 'Computer Engineering', icon: 'fas fa-laptop-code' },
        { id: 'IT', name: 'Information Technology', icon: 'fas fa-server' },
        { id: 'ENTC', name: 'Electronics & Telecommunication', icon: 'fas fa-broadcast-tower' },
        { id: 'Mech', name: 'Mechanical Engineering', icon: 'fas fa-cogs' },
        { id: 'Civil', name: 'Civil Engineering', icon: 'fas fa-city' },
        { id: 'Elec', name: 'Electrical Engineering', icon: 'fas fa-bolt' },
    ];

    const patterns = [
        { id: 'R2012', title: '2012 Pattern', description: 'Older PYQs (Pre-CBCS)' },
        { id: 'R2019', title: '2019 Pattern (CBCS)', description: 'Current Regular Syllabus' },
        { id: 'R2024', title: '2024 Pattern (NEP)', description: 'Upcoming Syllabus' },
    ];
    
    const years = ['FE', 'SE', 'TE', 'BE'];

    // 2. Mock Paper Data (A small, filtered sample for R2019 Comp Engg)
    const mockPapers = [
        // SE Comp R2019
        { id: 1, branch: 'Comp', year: 'SE', pattern: 'R2019', subject: 'Data Structures and Algorithms', exam: 'May 2023', size: '1.2MB' },
        { id: 2, branch: 'Comp', year: 'SE', pattern: 'R2019', subject: 'Object Oriented Programming', exam: 'Dec 2022', size: '1.1MB' },
        // TE Comp R2019
        { id: 3, branch: 'Comp', year: 'TE', pattern: 'R2019', subject: 'Database Management System', exam: 'May 2023', size: '1.5MB' },
        { id: 4, branch: 'Comp', year: 'TE', pattern: 'R2019', subject: 'Computer Networks', exam: 'Dec 2021', size: '0.9MB' },
        // FE Common R2019
        { id: 5, branch: 'Comp', year: 'FE', pattern: 'R2019', subject: 'Engineering Mathematics I', exam: 'May 2023', size: '2.1MB' },
        { id: 6, branch: 'Mech', year: 'FE', pattern: 'R2019', subject: 'Engineering Graphics', exam: 'Dec 2022', size: '1.8MB' },
    ];

    // --- 2. SPA Navigation Logic ---
    
    const pageSections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // State to track current filters
    let currentFilters = {
        page: 'home',
        branch: null,
        pattern: null,
        year: null
    };

    /** Switches the active view/page in the SPA simulation. */
    const navigateTo = (pageId, branchId = null, patternId = null, year = null) => {
        // 1. Update State
        currentFilters.page = pageId;
        currentFilters.branch = branchId;
        currentFilters.pattern = patternId;
        currentFilters.year = year;

        // 2. Update Visuals (Page)
        pageSections.forEach(section => {
            section.classList.remove('active-page');
        });
        document.getElementById(`page-${pageId}`).classList.add('active-page');

        // 3. Update Visuals (Nav Links)
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });

        // 4. Load Dynamic Content
        if (pageId === 'branches') {
            renderBranchGrid('branch-grid-full');
        }
        if (pageId === 'papers') {
            loadPapersPage();
        }
        if (pageId === 'home') {
             // Re-render home cards if necessary
             renderBranchGrid('branch-cards');
             renderPatternCards('pattern-cards');
             renderYearButtons('year-links');
        }
    };

    // Attach navigation listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.currentTarget.dataset.page;
            navigateTo(pageId);
        });
    });

    // --- 3. Rendering Functions (Home & Branch Pages) ---

    /** Renders the branch cards into the specified container. */
    const renderBranchGrid = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';

        branches.forEach(branch => {
            const card = document.createElement('div');
            card.className = 'branch-card';
            card.innerHTML = `
                <div class="card-icon-container"><i class="${branch.icon} card-icon"></i></div>
                <h3 class="card-title">${branch.name}</h3>
            `;
            // Interactive Link: Clicking a branch card navigates to the papers page, pre-filtered
            card.addEventListener('click', () => {
                navigateTo('papers', branch.id, null, null);
            });
            container.appendChild(card);
        });
    };
    
    /** Renders the pattern cards into the specified container. */
    const renderPatternCards = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        
        patterns.forEach(pattern => {
            const card = document.createElement('div');
            card.className = 'pattern-card';
            card.innerHTML = `
                <div class="card-icon-container"><i class="fas fa-scroll card-icon"></i></div>
                <h3 class="card-title">${pattern.title}</h3>
                <p class="card-description">${pattern.description}</p>
            `;
            // Interactive Link: Clicking a pattern card navigates to the papers page, pre-filtered
            card.addEventListener('click', () => {
                navigateTo('papers', null, pattern.id, null);
            });
            container.appendChild(card);
        });
    };
    
    /** Renders the year buttons into the specified container. */
    const renderYearButtons = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        
        years.forEach(year => {
            const button = document.createElement('button');
            button.className = 'year-btn';
            button.textContent = year;
            button.addEventListener('click', () => {
                // Interactive Link: Clicking a year button navigates to the papers page, pre-filtered
                navigateTo('papers', null, null, year);
            });
            container.appendChild(button);
        });
    };
    
    // --- 4. Papers Page Logic (Interactive Filtering) ---

    /** Loads and initializes the papers page content based on current filters. */
    const loadPapersPage = () => {
        const paperListContainer = document.getElementById('paper-list');
        const papersTitle = document.getElementById('papers-title');
        
        // 1. Set Title
        let title = 'All Branches & Patterns';
        if (currentFilters.branch) {
            const branchName = branches.find(b => b.id === currentFilters.branch)?.name;
            title = `${branchName || 'Unknown'} PYQs`;
        }
        if (currentFilters.pattern) {
             const patternTitle = patterns.find(p => p.id === currentFilters.pattern)?.title;
             title += ` (${patternTitle || 'Unknown Pattern'})`;
        }
        if (currentFilters.year) {
             title += ` - ${currentFilters.year}`;
        }
        papersTitle.textContent = title;

        // 2. Render Filters Sidebar
        renderFilterSidebar();

        // 3. Render Paper List (Filtered)
        renderPaperList(paperListContainer);
    };

    /** Renders the interactive filter groups in the sidebar. */
    const renderFilterSidebar = () => {
        const filterPatterns = document.getElementById('filter-patterns');
        const filterYears = document.getElementById('filter-years');
        
        // --- Pattern Filters ---
        filterPatterns.innerHTML = '<label>Filter by Pattern:</label>';
        patterns.forEach(p => {
            const btn = document.createElement('button');
            btn.className = `year-filter-btn ${currentFilters.pattern === p.id ? 'filter-active' : ''}`;
            btn.textContent = p.title;
            btn.addEventListener('click', () => {
                // Interactive Filter: Clicking updates the pattern filter and reloads the page content
                currentFilters.pattern = currentFilters.pattern === p.id ? null : p.id;
                loadPapersPage();
            });
            filterPatterns.appendChild(btn);
        });

        // --- Year Filters ---
        filterYears.innerHTML = '<label>Filter by Year:</label>';
        years.forEach(y => {
            const btn = document.createElement('button');
            btn.className = `year-filter-btn ${currentFilters.year === y ? 'filter-active' : ''}`;
            btn.textContent = y;
            btn.addEventListener('click', () => {
                // Interactive Filter: Clicking updates the year filter and reloads the page content
                currentFilters.year = currentFilters.year === y ? null : y;
                loadPapersPage();
            });
            filterYears.appendChild(btn);
        });
    };

    /** Renders the filtered paper list. */
    const renderPaperList = (container) => {
        let filteredPapers = mockPapers.filter(paper => {
            // Apply Branch Filter
            if (currentFilters.branch && paper.branch !== currentFilters.branch) return false;
            // Apply Pattern Filter
            if (currentFilters.pattern && paper.pattern !== currentFilters.pattern) return false;
            // Apply Year Filter
            if (currentFilters.year && paper.year !== currentFilters.year) return false;
            return true;
        });

        container.innerHTML = ''; // Clear previous list

        if (filteredPapers.length === 0) {
            container.innerHTML = '<p class="text-gray mt-5">No papers found matching your selection. Try clearing some filters!</p>';
            return;
        }

        filteredPapers.forEach(paper => {
            const item = document.createElement('div');
            item.className = 'paper-item';
            item.innerHTML = `
                <div class="paper-subject">${paper.subject}</div>
                <div class="paper-meta">
                    Branch: ${paper.branch} | Year: ${paper.year} | Pattern: ${paper.pattern} | Exam: ${paper.exam}
                </div>
                <button class="download-btn">
                    <i class="fas fa-file-pdf"></i> Download (${paper.size})
                </button>
            `;
            container.appendChild(item);
        });
    };

    // --- 5. Initialization ---

    // Render initial cards and set the home page active
    renderBranchGrid('branch-cards');
    renderPatternCards('pattern-cards');
    renderYearButtons('year-links');
    
    // Ensure the home page is the initial view
    navigateTo('home'); 
});