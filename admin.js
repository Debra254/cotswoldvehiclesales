// Admin Dashboard JavaScript
// Cotswold Vehicle Sales

// Configuration
const OWNER_PASSWORD = 'owner2024';
const MANAGER_PASSWORD = 'manager2024';
const STORAGE_KEY = 'cotswold_admin_vehicles';
const PENDING_KEY = 'cotswold_pending_actions';
const DEFAULT_VEHICLES_KEY = 'cotswold_default_vehicles';

// DOM Elements
const loginOverlay = document.getElementById('loginOverlay');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const addVehicleForm = document.getElementById('addVehicleForm');
const editVehicleForm = document.getElementById('editVehicleForm');
const vehicleTableBody = document.getElementById('vehicleTableBody');
const searchInventory = document.getElementById('searchInventory');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// State
let vehicles = [];
let pendingActions = [];
let deleteVehicleId = null;
let currentRole = null;
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadVehicles();
    checkAuth();
    setupEventListeners();
});

// Check authentication
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('admin_auth');
    const role = sessionStorage.getItem('admin_role');
    if (isAuthenticated === 'true' && role) {
        currentRole = role;
        showDashboard();
    }
}

// Show login error
function showLoginError(message) {
    loginError.textContent = message;
    loginError.classList.add('show');
}

// Clear login error
function clearLoginError() {
    loginError.textContent = '';
    loginError.classList.remove('show');
}

// Login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const role = document.getElementById('adminRole').value;
    const password = document.getElementById('adminPassword').value;
    
    let isValid = false;
    if (role === 'owner' && password === OWNER_PASSWORD) {
        isValid = true;
    } else if (role === 'manager' && password === MANAGER_PASSWORD) {
        isValid = true;
    }
    
    if (isValid) {
        sessionStorage.setItem('admin_auth', 'true');
        sessionStorage.setItem('admin_role', role);
        currentRole = role;
        clearLoginError();
        showDashboard();
    } else {
        showLoginError('Invalid role or password.');
    }
});

// Show dashboard
function showDashboard() {
    loginOverlay.style.display = 'none';
    adminDashboard.style.display = 'flex';
    loadVehicles();
    loadPendingActions();
    updateDashboardStats();
    updateRoleVisibility();
}

// Update role-based visibility
function updateRoleVisibility() {
    const pendingNav = document.querySelector('[data-section="pending-approvals"]');
    if (currentRole === 'owner' && pendingNav) {
        pendingNav.style.display = 'flex';
    } else if (pendingNav) {
        pendingNav.style.display = 'none';
    }
    
    // Role badge
    const roleBadge = document.getElementById('roleBadge');
    if (roleBadge) {
        roleBadge.textContent = currentRole.toUpperCase();
        roleBadge.className = `role-badge role-${currentRole}`;
    }
}

// Logout
function logout() {
    sessionStorage.removeItem('admin_auth');
    adminDashboard.style.display = 'none';
    loginOverlay.style.display = 'flex';
    document.getElementById('adminPassword').value = '';
    clearLoginError();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });
    
    // Add vehicle form
    addVehicleForm.addEventListener('submit', handleAddVehicle);
    
    // Edit vehicle form
    editVehicleForm.addEventListener('submit', handleEditVehicle);
    
    // Search
    searchInventory.addEventListener('input', handleSearch);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setFilter(filter);
        });
    });
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeEditModal();
            closeDeleteModal();
        }
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEditModal();
            closeDeleteModal();
        }
    });
}

// Show section
function showSection(sectionName) {
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionName) {
            item.classList.add('active');
        }
    });
    
    // Show corresponding section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const sectionMap = {
        'dashboard': 'dashboardSection',
        'add-vehicle': 'addVehicleSection',
        'manage-inventory': 'manageInventorySection',
        'pending-approvals': 'pendingApprovalsSection'
    };
    
    const targetSection = document.getElementById(sectionMap[sectionName]);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update stats when showing dashboard
    if (sectionName === 'dashboard') {
        updateDashboardStats();
    }
    
    // Refresh table when showing inventory
    if (sectionName === 'manage-inventory') {
        renderVehicleTable();
    }
}

// Load vehicles from localStorage
function loadVehicles() {
    const stored = localStorage.getItem(STORAGE_KEY);
    vehicles = stored ? JSON.parse(stored) : [];
}

// Load pending actions
function loadPendingActions() {
    const stored = localStorage.getItem(PENDING_KEY);
    pendingActions = stored ? JSON.parse(stored) : [];
}

// Save vehicles to localStorage
function saveVehicles() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
}

function savePendingActions() {
    localStorage.setItem(PENDING_KEY, JSON.stringify(pendingActions));
}

// Get all vehicles (admin + default)
function getAllVehicles() {
    return [...vehicles];
}

// Add new vehicle
function handleAddVehicle(e) {
    e.preventDefault();
    
    if (currentRole !== 'owner') {
        // Manager: add to pending
        const action = {
            id: Date.now(),
            type: 'add',
            timestamp: Date.now(),
            byRole: currentRole,
            vehicle: {
                id: Date.now(),
                isAdminVehicle: true,
                image: document.getElementById('vehicleImage').value,
                brand: document.getElementById('vehicleBrand').value,
                model: document.getElementById('vehicleModel').value,
                year: document.getElementById('vehicleYear').value,
                yearNum: parseInt(document.getElementById('vehicleYear').value),
                price: '£' + parseInt(document.getElementById('vehiclePrice')).toLocaleString(),
                priceNum: parseInt(document.getElementById('vehiclePrice').value),
                mileage: document.getElementById('vehicleMileage').value,
                fuel: document.getElementById('vehicleFuel').value,
                transmission: document.getElementById('vehicleTransmission').value,
                category: document.getElementById('vehicleCategory').value,
                color: document.getElementById('vehicleColor').value,
                title: document.getElementById('vehicleYear').value + ' ' + 
                       document.getElementById('vehicleBrand').value + ' ' + 
                       document.getElementById('vehicleModel').value,
                description: (document.getElementById('vehicleColor').value || 'Vehicle') + ' | ' + 
                            (document.getElementById('vehicleCategory').value || 'Car'),
                seats: '5 Seats',
                engine: '2.0L',
                fullDescription: document.getElementById('vehicleBrand').value + ' ' + 
                                document.getElementById('vehicleModel').value + '. ' +
                                document.getElementById('vehicleFuel').value + ' vehicle with ' +
                                document.getElementById('vehicleTransmission').value.toLowerCase() + ' transmission.',
                features: ['Bluetooth', 'Air Conditioning', 'Parking Sensors']
            }
        };
        pendingActions.unshift(action);
        savePendingActions();
        showToast('Vehicle queued for owner approval!', 'success');
    } else {
        // Owner: direct add
        const newVehicle = {
            id: Date.now(),
            isAdminVehicle: true,
            image: document.getElementById('vehicleImage').value,
            brand: document.getElementById('vehicleBrand').value,
            model: document.getElementById('vehicleModel').value,
            year: document.getElementById('vehicleYear').value,
            yearNum: parseInt(document.getElementById('vehicleYear').value),
            price: '£' + parseInt(document.getElementById('vehiclePrice')).toLocaleString(),
            priceNum: parseInt(document.getElementById('vehiclePrice').value),
            mileage: document.getElementById('vehicleMileage').value,
            fuel: document.getElementById('vehicleFuel').value,
            transmission: document.getElementById('vehicleTransmission').value,
            category: document.getElementById('vehicleCategory').value,
            color: document.getElementById('vehicleColor').value,
            title: document.getElementById('vehicleYear').value + ' ' + 
                   document.getElementById('vehicleBrand').value + ' ' + 
                   document.getElementById('vehicleModel').value,
            description: (document.getElementById('vehicleColor').value || 'Vehicle') + ' | ' + 
                        (document.getElementById('vehicleCategory').value || 'Car'),
            seats: '5 Seats',
            engine: '2.0L',
            fullDescription: document.getElementById('vehicleBrand').value + ' ' + 
                            document.getElementById('vehicleModel').value + '. ' +
                            document.getElementById('vehicleFuel').value + ' vehicle with ' +
                            document.getElementById('vehicleTransmission').value.toLowerCase() + ' transmission.',
            features: ['Bluetooth', 'Air Conditioning', 'Parking Sensors']
        };
        vehicles.push(newVehicle);
        saveVehicles();
        showToast('Vehicle added successfully!', 'success');
    }
    
    addVehicleForm.reset();
    showSection('manage-inventory');
}

// Render vehicle table
function renderVehicleTable() {
    const filteredVehicles = getFilteredVehicles();
    
    if (filteredVehicles.length === 0) {
        vehicleTableBody.innerHTML = '';
        document.getElementById('noVehicles').style.display = 'block';
        document.querySelector('.table-container').style.display = 'none';
        return;
    }
    
    document.getElementById('noVehicles').style.display = 'none';
    document.querySelector('.table-container').style.display = 'block';
    
    vehicleTableBody.innerHTML = filteredVehicles.map(vehicle => `
        <tr>
            <td>
                <img src="${vehicle.image}" alt="${vehicle.title}" class="vehicle-img" 
                     onerror="this.src='https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=200'">
            </td>
            <td>${vehicle.brand}</td>
            <td>${vehicle.model}</td>
            <td>${vehicle.year}</td>
            <td class="price-cell">${vehicle.price}</td>
            <td>${vehicle.mileage}</td>
            <td>
                ${vehicle.isAdminVehicle ? '<span class="badge-admin">Admin</span>' : ''}
                ${vehicle.fuel}
            </td>
            <td class="actions">
                <button class="btn-edit" onclick="openEditModal(${vehicle.id})">✏️ Edit</button>
                <button class="btn-delete" onclick="openDeleteModal(${vehicle.id}, '${escapeHtml(vehicle.title)}')">🗑 Delete</button>
            </td>
        </tr>
    `).join('');
}

// Get filtered vehicles
function getFilteredVehicles() {
    let filtered = getAllVehicles();
    const searchTerm = searchInventory.value.toLowerCase();
    
    // Apply search
    if (searchTerm) {
        filtered = filtered.filter(v => 
            v.brand.toLowerCase().includes(searchTerm) ||
            v.model.toLowerCase().includes(searchTerm) ||
            v.title.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply filter
    if (currentFilter === 'admin') {
        filtered = filtered.filter(v => v.isAdminVehicle);
    } else if (currentFilter === 'default') {
        filtered = filtered.filter(v => !v.isAdminVehicle);
    }
    
    return filtered;
}

// Handle search
function handleSearch() {
    renderVehicleTable();
}

// Set filter
function setFilter(filter) {
    currentFilter = filter;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    
    renderVehicleTable();
}

// Open edit modal
function openEditModal(vehicleId) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;
    
    document.getElementById('editVehicleId').value = vehicle.id;
    document.getElementById('editVehicleImage').value = vehicle.image || '';
    document.getElementById('editVehicleBrand').value = vehicle.brand || '';
    document.getElementById('editVehicleModel').value = vehicle.model || '';
    document.getElementById('editVehicleYear').value = vehicle.yearNum || vehicle.year || '';
    document.getElementById('editVehiclePrice').value = vehicle.priceNum || parseInt(vehicle.price.replace(/[^0-9]/g, '')) || '';
    document.getElementById('editVehicleMileage').value = vehicle.mileage || '';
    document.getElementById('editVehicleFuel').value = vehicle.fuel || 'Petrol';
    document.getElementById('editVehicleTransmission').value = vehicle.transmission || 'Manual';
    document.getElementById('editVehicleCategory').value = vehicle.category || 'Hatchback';
    document.getElementById('editVehicleColor').value = vehicle.color || '';
    
    document.getElementById('editModal').classList.add('show');
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
}

// Handle edit vehicle
function handleEditVehicle(e) {
    e.preventDefault();
    
    if (currentRole !== 'owner') {
        const vehicleId = parseInt(document.getElementById('editVehicleId').value);
        const originalVehicle = vehicles.find(v => v.id === vehicleId);
        if (!originalVehicle) {
            showToast('Vehicle not found', 'error');
            return;
        }
        const action = {
            id: Date.now(),
            type: 'edit',
            timestamp: Date.now(),
            byRole: currentRole,
            targetId: vehicleId,
            originalVehicle: {...originalVehicle},
            changes: {
                image: document.getElementById('editVehicleImage').value,
                brand: document.getElementById('editVehicleBrand').value,
                model: document.getElementById('editVehicleModel').value,
                year: document.getElementById('editVehicleYear').value,
                yearNum: parseInt(document.getElementById('editVehicleYear').value),
                price: '£' + parseInt(document.getElementById('editVehiclePrice').value).toLocaleString(),
                priceNum: parseInt(document.getElementById('editVehiclePrice').value),
                mileage: document.getElementById('editVehicleMileage').value,
                fuel: document.getElementById('editVehicleFuel').value,
                transmission: document.getElementById('editVehicleTransmission').value,
                category: document.getElementById('editVehicleCategory').value,
                color: document.getElementById('editVehicleColor').value,
                title: document.getElementById('editVehicleYear').value + ' ' + 
                       document.getElementById('editVehicleBrand').value + ' ' + 
                       document.getElementById('editVehicleModel').value,
                description: (document.getElementById('editVehicleColor').value || 'Vehicle') + ' | ' + 
                            (document.getElementById('editVehicleCategory').value || 'Car')
            }
        };
        pendingActions.unshift(action);
        savePendingActions();
        showToast('Edit queued for owner approval!', 'success');
    } else {
        // Owner direct edit
        const vehicleId = parseInt(document.getElementById('editVehicleId').value);
        const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);
        if (vehicleIndex === -1) {
            showToast('Vehicle not found', 'error');
            return;
        }
        vehicles[vehicleIndex] = {
            ...vehicles[vehicleIndex],
            ...changes
        };
        saveVehicles();
        closeEditModal();
        renderVehicleTable();
        showToast('Vehicle updated successfully!', 'success');
    }
}

// Open delete modal
function openDeleteModal(vehicleId, vehicleName) {
    deleteVehicleId = vehicleId;
    document.getElementById('deleteVehicleName').textContent = vehicleName;
    document.getElementById('deleteModal').classList.add('show');
}

// Close delete modal
function closeDeleteModal() {
    deleteVehicleId = null;
    document.getElementById('deleteModal').classList.remove('show');
}

// Confirm delete
function confirmDelete() {
    if (!deleteVehicleId) return;
    
    if (currentRole !== 'owner') {
        // Manager: queue delete
        const vehicle = vehicles.find(v => v.id === deleteVehicleId);
        const action = {
            id: Date.now(),
            type: 'delete',
            timestamp: Date.now(),
            byRole: currentRole,
            targetId: deleteVehicleId,
            vehicleName: vehicle ? vehicle.title : 'Unknown'
        };
        pendingActions.unshift(action);
        savePendingActions();
        showToast('Delete queued for owner approval!', 'success');
    } else {
        // Owner direct delete
        vehicles = vehicles.filter(v => v.id !== deleteVehicleId);
        saveVehicles();
        showToast('Vehicle deleted successfully!', 'success');
    }
    
    closeDeleteModal();
    renderVehicleTable();
}

// Update dashboard stats
function updateDashboardStats() {
    const totalVehicles = getAllVehicles().length;
    const pendingCount = pendingActions.length;
    const pendingCard = document.getElementById('pendingStatCard');
    const adminCard = document.getElementById('adminStatCard');
    
    // Common stats
    document.getElementById('totalVehicles').textContent = totalVehicles;
    
    const totalValue = vehicles.reduce((sum, v) => sum + (v.priceNum || 0), 0);
    document.getElementById('totalValue').textContent = '£' + totalValue.toLocaleString();
    
    document.getElementById('addedThisMonth').textContent = totalVehicles;
    
    if (currentRole === 'owner' && pendingCard && adminCard) {
        // Owner: show pending + live
        pendingCard.style.display = 'flex';
        adminCard.querySelector('h3').textContent = 'Live Vehicles';
        document.getElementById('pendingCount').textContent = pendingCount;
        document.getElementById('adminVehicles').textContent = totalVehicles;
    } else if (adminCard) {
        // Manager: original stats
        if (pendingCard) pendingCard.style.display = 'none';
        adminCard.querySelector('h3').textContent = 'Admin Vehicles';
        document.getElementById('adminVehicles').textContent = totalVehicles;
    }
}

// View website
function viewWebsite() {
    window.open('index.html', '_blank');
}

// Show toast notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.classList.remove('error');
    if (type === 'error') {
        toast.classList.add('error');
    }
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Escape HTML for security
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Pending approval functions
function renderPendingTable() {
    const pendingTableBody = document.getElementById('pendingTableBody');
    if (!pendingTableBody) return;
    
    pendingTableBody.innerHTML = pendingActions.map(action => {
        let content = '';
        if (action.type === 'add') {
            const v = action.vehicle;
            content = `
                <tr>
                    <td>New ${v.brand} ${v.model}</td>
                    <td>${v.price}</td>
                    <td><button class="btn-approve" onclick="approveAction(${action.id})">✅ Approve</button>
                    <button class="btn-reject" onclick="rejectAction(${action.id})">❌ Reject</button></td>
                </tr>
            `;
        } else if (action.type === 'edit') {
            content = `
                <tr>
                    <td>Edit ${action.targetId}</td>
                    <td>${action.changes.brand} ${action.changes.model}</td>
                    <td><button class="btn-approve" onclick="approveAction(${action.id})">✅ Approve</button>
                    <button class="btn-reject" onclick="rejectAction(${action.id})">❌ Reject</button></td>
                </tr>
            `;
        } else if (action.type === 'delete') {
            content = `
                <tr>
                    <td>Delete ${action.vehicleName}</td>
                    <td>-</td>
                    <td><button class="btn-approve" onclick="approveAction(${action.id})">✅ Approve</button>
                    <button class="btn-reject" onclick="rejectAction(${action.id})">❌ Reject</button></td>
                </tr>
            `;
        }
        return content;
    }).join('');
}

function approveAction(actionId) {
    const actionIndex = pendingActions.findIndex(a => a.id === actionId);
    const action = pendingActions[actionIndex];
    if (actionIndex === -1) return;
    
    if (action.type === 'add') {
        vehicles.push(action.vehicle);
        saveVehicles();
    } else if (action.type === 'edit') {
        const vehicleIndex = vehicles.findIndex(v => v.id === action.targetId);
        if (vehicleIndex !== -1) {
            vehicles[vehicleIndex] = {...vehicles[vehicleIndex], ...action.changes};
            saveVehicles();
        }
    } else if (action.type === 'delete') {
        vehicles = vehicles.filter(v => v.id !== action.targetId);
        saveVehicles();
    }
    
    pendingActions.splice(actionIndex, 1);
    savePendingActions();
    renderPendingTable();
    updateDashboardStats();
    showToast('Action approved!', 'success');
}

function rejectAction(actionId) {
    const actionIndex = pendingActions.findIndex(a => a.id === actionId);
    if (actionIndex !== -1) {
        pendingActions.splice(actionIndex, 1);
        savePendingActions();
        renderPendingTable();
        updateDashboardStats();
        showToast('Action rejected!', 'success');
    }
}

// Make functions globally accessible
window.showSection = showSection;
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal;
window.openDeleteModal = openDeleteModal;
window.closeDeleteModal = closeDeleteModal;
window.confirmDelete = confirmDelete;
window.viewWebsite = viewWebsite;
window.logout = logout;
window.approveAction = approveAction;
window.rejectAction = rejectAction;
window.renderPendingTable = renderPendingTable;

