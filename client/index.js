document
	.getElementById('reportForm')
	.addEventListener('submit', async event => {
		event.preventDefault()

		const formData = new FormData(event.target)
		const chapters = formData
			.get('chapters')
			.split(',')
			.map(chapter => chapter.trim())

		const requestData = {
			institute: formData.get('institute'),
			podr: formData.get('podr'),
			group: formData.get('group'),
			fio: formData.get('fio'),
			fio_prepod: formData.get('fio_prepod'),
			role: formData.get('role'),
			work_type: formData.get('work_type'),
			discipline: formData.get('discipline'),
			topic: formData.get('topic'),
			chapters: chapters,
		}

		const response = await fetch('http://92.38.241.219:8000/report/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestData),
		})

		if (response.ok) {
			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `${requestData.discipline}_${requestData.topic}.docx`
			document.getElementById('result').innerHTML =
				'Отчет успешно сгенерирован! <a href="' +
				url +
				'" download>Скачать отчет</a>'
		} else {
			document.getElementById('result').textContent =
				'Ошибка при генерации отчета.'
		}
	})
