(async () => {
    const open = (await import('open')).default;
    
    // Now you can use the 'open' function
    open('https://www.example.com');
})();