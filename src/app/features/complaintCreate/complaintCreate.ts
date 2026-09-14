import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintService } from '../../core/services/complaintService';

@Component({
  selector: 'app-complaint-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './complaintCreate.html',
  styleUrl: './complaintCreate.css'
})
export class ComplaintCreate {
  private fb = inject(FormBuilder);
  private service = inject(ComplaintService);
  private router = inject(Router);

  selectedFile = signal<File | null>(null);
  fileError = signal<string | null>(null);
  submitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  complaintForm: FormGroup = this.fb.group({
    complainant_name: ['', Validators.required],
    mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    complaint_type: ['', Validators.required],
    complaint_subtype: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  isInvalid(controlName: string): boolean {
    const control = this.complaintForm.get(controlName);
    return !!(control && control.touched && control.invalid);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type !== 'application/pdf') {
        this.fileError.set('Only PDF files are allowed.');
        this.selectedFile.set(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.fileError.set('File size exceeds the 5MB limit.');
        this.selectedFile.set(null);
        return;
      }
      this.fileError.set(null);
      this.selectedFile.set(file);
    }
  }

  onSubmit() {
    this.complaintForm.markAllAsTouched();

    if (!this.selectedFile()) {
      this.fileError.set('Please select a valid PDF file.');
      return;
    }

    if (this.complaintForm.invalid) return;

    this.submitting.set(true);
    this.errorMessage.set(null);

    const formData = new FormData();
    Object.keys(this.complaintForm.value).forEach(key => {
      formData.append(key, this.complaintForm.value[key]);
    });
    formData.append('document', this.selectedFile()!);

    this.service.registerComplaint(formData).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.router.navigate(['/complaints', res.complaint.id]);
      },
      error: (err) => {
        this.submitting.set(false);
        this.errorMessage.set(err.error?.error || 'Failed to submit complaint.');
      }
    });
  }
}