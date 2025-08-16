




export const formatDate = (dateString) => {
    const formattedDate = new Date(dateString);
    return formattedDate.toLocaleDateString('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}



export const formatName = (nome) => {
    if (nome === 'FC Internazionale Milano') {
        return 'Inter';
    }

    return nome 
}