function sh_answer(btn, aid) {
    const x = document.getElementById(aid)
    x.classList.toggle('answer-hidden')
    btn.classList.toggle('a-hide')
}