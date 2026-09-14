import { Component, inject, OnInit, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ComplaintService } from '../../core/services/complaintService';
import { Complaint } from '../../shared/models/complaint.type';

@Component({
  selector: 'app-complaint-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './complaintDetail.html',
  styleUrl: './complaintDetail.css'
})
export class ComplaintDetailComponent implements OnInit {
  private service = inject(ComplaintService);
  private router = inject(Router);

  @Input() id!: string;

  complaint = signal<Complaint | null>(null);
  loading = signal<boolean>(true);
  resolving = signal<boolean>(false);

  ngOnInit() {
    if (this.id) {
      this.service.getComplaintById(this.id).subscribe({
        next: (data) => {
          this.complaint.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    }
  }

  resolveComplaint() {
    const record = this.complaint();
    if (!record) return;

    if (confirm(`Are you sure you want to mark "${record.title}" as resolved and remove it?`)) {
      this.resolving.set(true);
      this.service.deleteComplaint(record.id).subscribe({
        next: () => {
          this.router.navigate(['/complaints']);
        },
        error: () => {
          alert('Failed to resolve complaint. Please try again.');
          this.resolving.set(false);
        }
      });
    }
  }
}