import { useParams, Navigate } from 'react-router-dom'
import { useProjects } from '../../context/ProjectContext'
import ProjectForm from './ProjectForm'

export default function EditProject() {
  const { id } = useParams<{ id: string }>()
  const { getProject } = useProjects()
  const project = getProject(id!)

  if (!project) return <Navigate to="/admin/dashboard" replace />
  return <ProjectForm existing={project} />
}
