let lanyardDataCache = null;

async function fetchLanyardData() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/1126147122308325376`);
        const data = await response.json();
        if (data.success) {
            lanyardDataCache = data.data;
        }
    } catch (error) {
        console.error('Failed to fetch Lanyard data:', error);
    }
}

function updateProfilePicture(discord_user) {
    const profilePictureSrc = `https://cdn.discordapp.com/avatars/1126147122308325376/${discord_user.avatar}.png`;
    const pfp = document.getElementById('pfp');
    if (pfp && pfp.src !== profilePictureSrc) {
        pfp.src = profilePictureSrc;
    }
}

function updateStatusDot(discord_status) {
    const statusDot = document.getElementById('status-dot');
    if (!statusDot) return;

    const statusColors = {
        online: "#22C55E",
        idle: "#FACC15",
        dnd: "#EF4444",
        offline: "#6B7280"
    };

    statusDot.style.backgroundColor = statusColors[discord_status] || statusColors.offline;
    statusDot.setAttribute('title', new Date().toLocaleTimeString("en-AU", { timeZone: "Australia/Melbourne" }));
}

async function updateUI() {
    await fetchLanyardData();
    if (!lanyardDataCache) return;

    const { discord_user, discord_status } = lanyardDataCache;
    updateProfilePicture(discord_user);
    updateStatusDot(discord_status);
}

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    setInterval(updateUI, 1000);
});