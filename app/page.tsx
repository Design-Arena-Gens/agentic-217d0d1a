'use client'

import { useState } from 'react'

export default function Home() {
  const [crops, setCrops] = useState([
    { id: 1, name: 'طماطم', area: '500 متر', status: 'نمو جيد' },
    { id: 2, name: 'خيار', area: '300 متر', status: 'يحتاج ري' },
    { id: 3, name: 'فلفل', area: '200 متر', status: 'جاهز للحصاد' }
  ])

  const [animals, setAnimals] = useState([
    { id: 1, type: 'أبقار', count: 12, health: 'جيدة' },
    { id: 2, type: 'أغنام', count: 25, health: 'ممتازة' },
    { id: 3, type: 'دجاج', count: 50, health: 'جيدة' }
  ])

  const [tasks, setTasks] = useState([
    { id: 1, task: 'ري المحاصيل', completed: false },
    { id: 2, task: 'فحص صحة الحيوانات', completed: false },
    { id: 3, task: 'تنظيف الحظائر', completed: true }
  ])

  const [newCrop, setNewCrop] = useState({ name: '', area: '', status: '' })
  const [newAnimal, setNewAnimal] = useState({ type: '', count: '', health: '' })
  const [newTask, setNewTask] = useState('')

  const addCrop = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCrop.name && newCrop.area && newCrop.status) {
      setCrops([...crops, { id: Date.now(), ...newCrop }])
      setNewCrop({ name: '', area: '', status: '' })
    }
  }

  const addAnimal = (e: React.FormEvent) => {
    e.preventDefault()
    if (newAnimal.type && newAnimal.count && newAnimal.health) {
      setAnimals([...animals, { id: Date.now(), type: newAnimal.type, count: parseInt(newAnimal.count), health: newAnimal.health }])
      setNewAnimal({ type: '', count: '', health: '' })
    }
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), task: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🌾 مزرعتي الذكية</h1>
        <p>نظام متكامل لإدارة المزارع والمحاصيل والحيوانات</p>
      </div>

      <div className="stats">
        <div className="stat-box">
          <h3>{crops.length}</h3>
          <p>أنواع المحاصيل</p>
        </div>
        <div className="stat-box">
          <h3>{animals.reduce((sum, a) => sum + a.count, 0)}</h3>
          <p>إجمالي الحيوانات</p>
        </div>
        <div className="stat-box">
          <h3>{tasks.filter(t => !t.completed).length}</h3>
          <p>مهام معلقة</p>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h2><span className="card-icon">🌱</span> المحاصيل</h2>
          <ul>
            {crops.map(crop => (
              <li key={crop.id}>
                <strong>{crop.name}</strong> - {crop.area} - {crop.status}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2><span className="card-icon">🐄</span> الحيوانات</h2>
          <ul>
            {animals.map(animal => (
              <li key={animal.id}>
                <strong>{animal.type}</strong> - العدد: {animal.count} - الصحة: {animal.health}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2><span className="card-icon">✅</span> المهام اليومية</h2>
          <ul>
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <span>{task.task}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid">
        <div className="form-section">
          <h2>إضافة محصول جديد</h2>
          <form onSubmit={addCrop}>
            <div className="form-group">
              <label>اسم المحصول</label>
              <input
                type="text"
                value={newCrop.name}
                onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                placeholder="مثال: بطاطس"
              />
            </div>
            <div className="form-group">
              <label>المساحة</label>
              <input
                type="text"
                value={newCrop.area}
                onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                placeholder="مثال: 400 متر"
              />
            </div>
            <div className="form-group">
              <label>الحالة</label>
              <select
                value={newCrop.status}
                onChange={(e) => setNewCrop({...newCrop, status: e.target.value})}
              >
                <option value="">اختر الحالة</option>
                <option value="بذور">بذور</option>
                <option value="نمو">نمو</option>
                <option value="نمو جيد">نمو جيد</option>
                <option value="جاهز للحصاد">جاهز للحصاد</option>
              </select>
            </div>
            <button type="submit" className="btn">إضافة محصول</button>
          </form>
        </div>

        <div className="form-section">
          <h2>إضافة حيوانات</h2>
          <form onSubmit={addAnimal}>
            <div className="form-group">
              <label>نوع الحيوان</label>
              <input
                type="text"
                value={newAnimal.type}
                onChange={(e) => setNewAnimal({...newAnimal, type: e.target.value})}
                placeholder="مثال: ماعز"
              />
            </div>
            <div className="form-group">
              <label>العدد</label>
              <input
                type="number"
                value={newAnimal.count}
                onChange={(e) => setNewAnimal({...newAnimal, count: e.target.value})}
                placeholder="مثال: 10"
              />
            </div>
            <div className="form-group">
              <label>الحالة الصحية</label>
              <select
                value={newAnimal.health}
                onChange={(e) => setNewAnimal({...newAnimal, health: e.target.value})}
              >
                <option value="">اختر الحالة</option>
                <option value="ممتازة">ممتازة</option>
                <option value="جيدة">جيدة</option>
                <option value="تحتاج عناية">تحتاج عناية</option>
              </select>
            </div>
            <button type="submit" className="btn">إضافة حيوانات</button>
          </form>
        </div>

        <div className="form-section">
          <h2>إضافة مهمة جديدة</h2>
          <form onSubmit={addTask}>
            <div className="form-group">
              <label>المهمة</label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="مثال: تسميد الأرض"
              />
            </div>
            <button type="submit" className="btn">إضافة مهمة</button>
          </form>
        </div>
      </div>
    </div>
  )
}
